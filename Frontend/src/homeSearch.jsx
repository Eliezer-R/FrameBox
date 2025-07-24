import { useSearchContext } from './contexts/SearchContext'
import { useNavigations } from './methodLocationAndNavigation'
import { useEffect } from 'react'
import useHandleInputChange from './handleSearchHome'

function SearchHome () {
  const { searchValueOfTheInput, setSearchValueOfTheInput } = useSearchContext()
  const { handleInputChange } = useHandleInputChange()
  const { location } = useNavigations()

  // Clear state when on the root path
  useEffect(() => {
    if (location.pathname === '/' && searchValueOfTheInput !== '') {
      setSearchValueOfTheInput('')
    }
  }, [location.pathname, searchValueOfTheInput, setSearchValueOfTheInput])

  return (
    <div className='search-home'>
      <h1>Search</h1>
      <p>Search high-resolution images from unPlash</p>
      <div className='content-input-search'>
        <input
          type='text'
          name='search'
          className='input-search'
          placeholder='Enter your keywords...'
          value={searchValueOfTheInput}
          onChange={handleInputChange}
          autoFocus
        />
      </div>
    </div>
  )
}

export default SearchHome
