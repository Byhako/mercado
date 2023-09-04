import { Description, Results, ResultsCategories, ResultsList } from "./types"

const api = {
  item: {
    search: (query: string) => fetch(`https://api.mercadolibre.com/sites/MCO/search?q=${query}&limit=9`)
      .then(res => res.json() as Promise<ResultsList>),
    fetch: async (id: string) => {
      const results = await fetch(`https://api.mercadolibre.com/items/${id}`)
      .then(res => res.json() as Promise<Results>)
      const description = await fetch(`https://api.mercadolibre.com/items/${id}/description`)
        .then(res => res.json() as Promise<Description>)

      return {
        ...results,
        description: description.plain_text
      }
    },
    categories: (id: string) => fetch(`https://api.mercadolibre.com/categories/${id}`)
    .then(res => res.json() as Promise<ResultsCategories>)
  }
}

export default api
