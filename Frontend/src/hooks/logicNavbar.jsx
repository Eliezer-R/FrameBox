import { useSearchContext } from '../contexts/SearchContext'
import { useNavigations } from '../methodLocationAndNavigation'
import { useCollectionsContext } from '../contexts/CollectionsContext'
export const useLogicNavBar = () => {
  const { searchValueOfTheInput } = useSearchContext()
  const { setAlternate } = useCollectionsContext()
  const { navigate } = useNavigations()
  const handleCollection = () => {
    navigate('/collections')
    setAlternate('collection')
  }

  const handleHome = () => {
    setAlternate('home')
    if (!searchValueOfTheInput) {
      navigate('/')
    } else {
      navigate(`/search?q=${encodeURIComponent(searchValueOfTheInput)}`)
    }
  }

  return {
    handleCollection,
    handleHome
  }
}
