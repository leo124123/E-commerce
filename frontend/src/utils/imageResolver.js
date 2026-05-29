const productImageModules = import.meta.glob('../assets/Product img/*.{jpg,jpeg,png,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const productImageMap = new Map(
  Object.entries(productImageModules).map(([filePath, url]) => {
    const filename = filePath.split('/').pop()
    return [filename, url]
  })
)

export function resolveProductImage(src) {
  if (!src || typeof src !== 'string') return src;
  if (/^https?:\/\//i.test(src) || src.startsWith('data:')) {
    return src;
  }

  const mappedUrl = productImageMap.get(src)
  if (mappedUrl) {
    return mappedUrl
  }

  return src;
}
