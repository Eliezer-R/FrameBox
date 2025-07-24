import { useState, useEffect } from 'react'
function useDataApi (searchValue) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY_API

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchData = async () => {
        if (searchValue.length < 2) {
          setData([])
          setLoading(false)
          return
        }
        try {
          const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchValue}&client_id=${ACCESS_KEY}&per_page=30`)
          if (!response.ok) throw new Error('Network response was not ok')
          const result = await response.json()
          setData(result.results)
        } catch (error) {
          console.error('Error fetching data:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [searchValue])

  return { data, loading }
}

export default useDataApi
