"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import api from '@/api'
import BreadCrumb from '@/components/Breadcrumb'
import { Path, Results, ResultsCategories } from '@/types'
import '../styles.css'

type Props = {
  params: { id: string }
  searchParams: {
    seller: string
    installments: string
    category: string
  }
}

export default function ItemPage({params: {id}, searchParams}: Props) {
  const { seller, installments, category } = searchParams
  const [image, setImage] = useState<string>('')
  const [path, setPath] = useState<Path[]>()
  const [results, setResults] = useState<Results>()

  useEffect(() => {
    const getData = async () => {
      const data = await api.item.fetch(id)
      const categories: ResultsCategories = await api.item.categories(category)

      setPath(categories.path_from_root)
      setImage(data.pictures[0].url)
      setResults(data)

      return
    }
    getData()
  }, [id, category])

  const installment = JSON.parse(installments)

  if (!results) return (
    <div className='flex center'>
      <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    </div>
  )

  return (
    <section className="container">
      <BreadCrumb path={path} />
      <div className="warpper">
        <p className='name mobileName'>{results.title}</p>

        <div className='content_images'>
          <div className="list_images">
            {results.pictures.map(item => (
              <button key={item.id} onClick={() => setImage(item.url)}>
                <Image
                  src={item.url}
                  alt='image'
                  className="img_second"
                  width={44}
                  height={44}
                />
              </button>
            ))}
          </div>

          <img
            src={image}
            alt='image'
            className="img_primary"
          />
        </div>

        <div className="informacion">
          <p className='name desktopName'>{results.title}</p>

          <p className='original'>
            {results.original_price &&
              Number(results.original_price).toLocaleString(
                'es-CO',
                {
                  style: 'currency',
                  maximumFractionDigits: 0,
                  currency: results.currency_id
                }
              )
            }
          </p>
          <p className='price'>
            {Number(results.price).toLocaleString(
              'es-CO',
              {
                style: 'currency',
                maximumFractionDigits: 0,
                currency: results.currency_id
              }
            )}
            {results.original_price &&
              <span>
                {Math.round((100/results.original_price)*(results.original_price - results.price))}% off
              </span>
            }
          </p>
          <p className='installemnt'>
            <span>en</span> {installment.quantity}X{'  '}
            {Number(installment.amount).toLocaleString(
              'es-CO',
              {
                style: 'currency',
                maximumFractionDigits: 0,
                currency: results.currency_id
              }
            )}
          </p>

        </div>

        <div className="additional">
          {results.shipping.free_shipping && <p className='send'>Envío gratis a nivel nacional</p>}
          
          <p className="seller">Vendido por: <b>{seller}</b></p>
          <p>
            {results.available_quantity === 1 ? (
              <>¡Última disponible!</>
            ) : (
              <>{results.available_quantity} unidades disponibles</>
            )}
          </p>

          <button type='button'>Comprar</button>
        </div>
      </div>

      {results.description && (
        <div className="description">
          <h2>Descripción</h2>
          <p>{results.description}</p>
        </div>
      )}
    </section>
  )
}