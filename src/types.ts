export type Results = {
  title: string
  price: number
  original_price: number
  available_quantity: number
  currency_id: string
  pictures: [ { url: string, id: string } ]
  shipping: { free_shipping: boolean }
  description: string
}

export type ResultsCategories = {
  path_from_root: { name: string }[]
}

export type Path = {
  name: string
}

export type Result = {
  id: string
  title: string
  thumbnail: string
  price: number
  original_price: number
  category_id: string
  currency_id: string
  shipping: { free_shipping: boolean }
  seller_address: {
    city: { name: string }
    state: { name: string }
  }
  installments : { quantity: number, amount: number }
  seller: { nickname: string }
}

export type ResultsList = {
  results: Result[]
}

export type Description = {
  plain_text: string
}
