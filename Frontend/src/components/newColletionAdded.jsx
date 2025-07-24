import { useNavigate } from 'react-router-dom'
import RenderCoverImgs from './renderCoverImg'
import { useCollectionsContext } from '../contexts/CollectionsContext'

// page so that when we click on one of our collections it will show us
function ColletionAdded ({ collection }) {
  const { setAlternate } = useCollectionsContext()
  const navigate = useNavigate()

  const handlerCollections = () => {
    setAlternate('')
    navigate(`/collections/${collection.id_collection}`)
  }

  return (
    <div className='colletion-Added-container' onClick={handlerCollections}>
      <div className='colletionAdded-imgs-covers'>
        <RenderCoverImgs collection={collection} />
      </div>
      <div className='colletionAdded-title'>
        <h3>{collection.name}</h3>
        <p>{collection.images.length} photos </p>
      </div>
    </div>
  )
}

export default ColletionAdded
