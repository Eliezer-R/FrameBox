import { useStyles } from '../resources/stylesNavbar'
import { useCollectionsContext } from '../contexts/CollectionsContext'
import { useEffect } from 'react'
import { useNavigations } from '../methodLocationAndNavigation'
import { useLogicNavBar } from '../hooks/logicNavbar'
function Navbar () {
  const { styles, noneStyle } = useStyles()
  const { location } = useNavigations()
  const { alternate, setAlternate } = useCollectionsContext()
  const { handleCollection, handleHome } = useLogicNavBar()

  useEffect(() => {
    if (location.pathname.startsWith('/collections')) {
      setAlternate('collection')
    }
  }, [location.pathname, setAlternate])

  return (
    <nav className='nav-bar'>
      <img src='../../resources/Logo.svg' alt='Logo' />
      <div className='content-HomeAndcolletion'>
        <span onClick={handleHome} style={alternate === 'home' ? styles : noneStyle}>Home</span>
        <span onClick={handleCollection} style={alternate === 'collection' ? styles : noneStyle}>Collection</span>
      </div>
    </nav>
  )
}

export default Navbar
