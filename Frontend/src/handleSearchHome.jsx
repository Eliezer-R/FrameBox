import { useCollectionsContext } from './contexts/CollectionsContext'
import { useNavigations } from './methodLocationAndNavigation'
function useHandleInputChange () {
  const { setAlternate } = useCollectionsContext()
  const { navigate } = useNavigations()

  // If the input is empty we simply go to home, if not the search is done and shown in the url
  const handleInputChange = (e) => {
    const newValue = e.target.value
    if (newValue !== '') {
      navigate(`/search?q=${encodeURIComponent(newValue)}`)
      setAlternate('home')
    } else {
      navigate('/')
      setAlternate('home')
    }
  }

  return {
    handleInputChange
  }
}

export default useHandleInputChange
