import { useNavigate, useLocation } from 'react-router-dom'
import { useSearchContext } from '../contexts/SearchContext'
import { useCollectionsContext } from '../contexts/CollectionsContext'
import { useEffect } from 'react'

function useLogicPageShow () {
  const { searchValueOfTheInput, setSearchValueOfTheInput } = useSearchContext()
  const { setClickImg } = useCollectionsContext()
  const navigate = useNavigate()
  const location = useLocation()

  // Only sync state with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const q = params.get('q') || ''
    if (q !== searchValueOfTheInput) {
      setSearchValueOfTheInput(q)
    }
  }, [location.search])

  // The input only changes the URL, not the state directly
  const handleInputChange = (e) => {
    const newValue = e.target.value
    if (newValue === '') {
      navigate('/')
    } else {
      navigate(`/search?q=${encodeURIComponent(newValue)}`)
    }
  }

  // Clicking on an image sends data to setClickImg
  const handleClick = ({ dat }) => {
    setClickImg({ imgData: dat })
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('imgData', JSON.stringify({ imgData: dat }))
    }
    navigate(`/search/${dat.id}`)
  }

  return {
    handleInputChange,
    handleClick
  }
}

export default useLogicPageShow
