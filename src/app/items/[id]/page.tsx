"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import '../styles.css'

type Props = {
  params: { id: string }
  searchParams: {
    seller: string
    installments: string
  }
}

type Results = {
  title: string
  price: number
  original_price: number
  available_quantity: number
  currency_id: string
  pictures: [ { url: string, id: string } ]
  shipping: { free_shipping: boolean }
}

type Description = {
  plain_text: string
}

export default function ItemPage({params: {id}, searchParams}: Props) {
  const [image, setImage] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [results, setResults] = useState<Results>()

  useEffect(() => {
    const getData = async () => {
      const results = await fetch(`https://api.mercadolibre.com/items/${id}`)
      .then(res => res.json() as Promise<Results>)

      const description = await fetch(`https://api.mercadolibre.com/items/${id}/description`)
        .then(res => res.json() as Promise<Description>)

      setImage(results.pictures[0].url)
      setResults(results)
      setDescription(description.plain_text)

      return
    }

    getData()

  }, [id])

  const { seller, installments } = searchParams
  const installment = JSON.parse(installments)

  if (!results) return <p>Cargango ...</p>

  return (
    <section className="container">
      <div className="warpper">
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

        <Image
          src={image}
          alt='image'
          className="img_primary"
          width={370}
          height={450}
        />

        <div className="informacion">
          <p className='name'>{results.title}</p>

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

      <div className="description">
        <h2>Description</h2>
        <p>{description}</p>
      </div>
    </section>
  )
}