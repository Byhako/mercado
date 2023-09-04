"use client"
import { useState, useEffect } from 'react'
import api from '@/api'
import Image from 'next/image'
import '../styles.css'
import BreadCrumb from '@/components/Breadcrumb'
import { Path, Results, ResultsCategories } from '@/types'

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

  if (!results) return <p>Cargango ...</p>

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