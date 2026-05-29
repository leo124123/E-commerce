const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const assetsDir = path.join(__dirname, '..', 'frontend', 'src', 'assets', 'Product img')
if (!fs.existsSync(assetsDir)) {
  console.error('Assets folder not found:', assetsDir)
  process.exit(1)
}

const Product = require('./models/Product')
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce'

;(async () => {
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    const products = await Product.find({}, { images: 1, colors: 1 }).lean()
    const dbFilesSet = new Set()
    products.forEach(p => {
      (p.images || []).forEach(i => i && dbFilesSet.add(i))
      ;(p.colors || []).forEach(c => c && c.image && dbFilesSet.add(c.image))
    })

    const files = fs.readdirSync(assetsDir).filter(f => !f.startsWith('.'))
    const assetSet = new Set(files)

    const missing = [...dbFilesSet].filter(f => !assetSet.has(f))
    console.log('DB image filenames total:', dbFilesSet.size)
    console.log('Asset files total:', files.length)
    console.log('Missing files to resolve (count):', missing.length)

    const renamed = []
    const skipped = []

    for (const target of missing) {
      const parts = target.split('_')
      const prefix = parts.slice(0, 2).join('_') // e.g. 'imgi_100'
      const candidates = files.filter(fn => fn.includes(prefix))
      if (candidates.length === 1) {
        const src = path.join(assetsDir, candidates[0])
        const dest = path.join(assetsDir, target)
        if (fs.existsSync(dest)) {
          skipped.push({ target, reason: 'destination exists' })
          continue
        }
        fs.renameSync(src, dest)
        // update lists
        const idx = files.indexOf(candidates[0])
        if (idx !== -1) files.splice(idx, 1, target)
        assetSet.delete(candidates[0])
        assetSet.add(target)
        renamed.push({ from: candidates[0], to: target })
      } else if (candidates.length > 1) {
        skipped.push({ target, reason: 'multiple candidates', candidates })
      } else {
        // try looser match: match by numeric id (imgi_100 -> find '100' in name)
        const token = parts[1] || ''
        const loosers = files.filter(fn => fn.includes(token))
        if (loosers.length === 1) {
          const src = path.join(assetsDir, loosers[0])
          const dest = path.join(assetsDir, target)
          fs.renameSync(src, dest)
          const idx = files.indexOf(loosers[0])
          if (idx !== -1) files.splice(idx, 1, target)
          assetSet.delete(loosers[0])
          assetSet.add(target)
          renamed.push({ from: loosers[0], to: target, heuristic: 'token' })
        } else {
          skipped.push({ target, reason: 'no candidates' })
        }
      }
    }

    console.log('Renamed count:', renamed.length)
    if (renamed.length) console.dir(renamed, { depth: 3 })
    if (skipped.length) {
      console.log('Skipped or ambiguous items:', skipped.length)
      console.dir(skipped.slice(0, 30), { depth: 3 })
    }
  } catch (err) {
    console.error('Error:', err.message)
    process.exitCode = 2
  } finally {
    try { await mongoose.disconnect() } catch (e) {}
  }
})()
