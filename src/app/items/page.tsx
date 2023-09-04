import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import api from '@/api'
import { Result, ResultsList } from '@/types'
import './styles.css'

export const metadata: Metadata = {
  title: 'Productos',
  description: 'Example page to market. Products',
  icons: {
    icon: '/logo.png'
  }
}

type Props = {
  searchParams: { search: string }
}

export default async function Items({ searchParams }: Props) {
  const { results }: ResultsList = await api.item.search(searchParams.search)

  return (
    <section className="container">
      <h1 className='title_list'>Resultados para: {searchParams.search}</h1>

      <article className='list_products'>
        {results.map((item: Result) => (
          <Link
            href={`/items/${item.id}?seller=${item.seller.nickname}&installments=${JSON.stringify(item.installments)}&category=${item.category_id}`}
            key={item.id}
            className='card'
          >
            <Image
              src={item.thumbnail}
              alt={item.id}
              className="img_product"
              width={160}
              height={160}
            />
            <div className='info_product'>
              <p className='name'>{item.title}</p>
              <div className='data-product'>
                <p className='original'>
                  {item.original_price &&
                    Number(item.original_price).toLocaleString(
                      'es-CO',
                      {
                        style: 'currency',
                        maximumFractionDigits: 0,
                        currency: item.currency_id
                      }
                    )
                  }
                </p>
                <p className='price'>
                  {Number(item.price).toLocaleString(
                    'es-CO',
                    {
                      style: 'currency',
                      maximumFractionDigits: 0,
                      currency: item.currency_id
                    }
                  )}
                  {item.original_price &&
                    <span>
                      {Math.round((100/item.original_price)*(item.original_price - item.price))}% off
                    </span>
                  }
                </p>
                <p className='installemnt'>
                  <span>en {item.installments.quantity}X</span>
                  {Number(item.installments.amount).toLocaleString(
                    'es-CO',
                    {
                      style: 'currency',
                      maximumFractionDigits: 0,
                      currency: item.currency_id
                    }
                  )}
                </p>
                <p className='city'>{item.seller_address.state.name}, {item.seller_address.city.name}</p>
                {item.shipping.free_shipping && <p className='send'>Envío gratis</p>}
              </div>
            </div>
          </Link>
        ))}
      </article>
    </section>
  )
}