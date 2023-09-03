import Image from 'next/image'
import './styles.css'
import Link from 'next/link'

type Props = {
  searchParams: { search: string }
}

type Results = {
  results: {
    id: string
    title: string
    thumbnail: string
    price: number
    original_price: number
    currency_id: string
    shipping: { free_shipping: boolean }
    seller_address: {
      city: { name: string }
      state: { name: string }
    }
    installments : { quantity: number, amount: number }
    seller: { nickname: string }
  }[]
}

// https://api.mercadolibre.com/items/id
// https://api.mercadolibre.com/sites/MCO/search?q=${product}&limit=4

export default async function Items({ searchParams }: Props) {
  const { results } = await fetch(`https://api.mercadolibre.com/sites/MCO/search?q=${searchParams.search}&limit=4`)
    .then(res => res.json() as Promise<Results>)

  return (
    <section className="container">
      <h1 className='title'>Resultados para: {searchParams.search}</h1>

      <article className='list_products'>
        {results.map(item => (
          <Link
            href={`/items/${item.id}?seller=${item.seller.nickname}&installments=${JSON.stringify(item.installments)}`}
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