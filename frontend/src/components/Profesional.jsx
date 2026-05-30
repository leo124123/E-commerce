import { StrictMode, useEffect, useState } from 'react'
import './profesional.css'



export default function Profesional () { 
    return ( 
          <div className='pro'>
             <div className='container'>
                <img src='../public/img/imgi_48_6d20d632367eb527c58aeee491ca51da7c5370c6.jpg' className='img-1'/> 
                <p className='parra'> 
                
                </p>
                <button> 
                       COMPRAR AHORA
                </button>
             </div>
              <div className='pro-fe'> 
                   <div className='container-two'> 
                        <img src='../public/img/imgi_146_4bb288a9984112ca630219adfd934de9565d3af0-1536x1536.jpg '  className='img-2'/>
                        <p className='parrafo'> 

                        </p>
                        <button>
                            COMPRAR AHORA
                        </button>
                   </div>
              </div>
          </div>
    )
}