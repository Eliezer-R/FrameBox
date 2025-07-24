import { createContext, useContext, useState, useEffect } from 'react'
import useDataApi from '../resources/dataUnplashApi'

const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  // Initialize from localStorage only if it exists (browser)
  const [searchValueOfTheInput, setSearchValueOfTheInput] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('searchValueOfTheInput') || ''
    }
    return ''
  })

  // Save to localStorage only if it exists (browser)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('searchValueOfTheInput', searchValueOfTheInput)
    }
  }, [searchValueOfTheInput])

  const { data, loading } = useDataApi(searchValueOfTheInput)

  return (
    <SearchContext.Provider value={{
      searchValueOfTheInput,
      setSearchValueOfTheInput,
      data,
      loading
    }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => useContext(SearchContext)
