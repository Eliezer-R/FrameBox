import { useParams } from 'react-router-dom'
import { useCollectionsContext } from './contexts/CollectionsContext'
import YourPhotoColletions from './components/yourPhotoColletions'
import { useEffect } from 'react'
import { useDetail } from './hooks/hooksCollectionDetail'

function CollectionDetail () {
  const { id } = useParams()
  const { collections, setAlternate } = useCollectionsContext()
  const { collectionDetail, setCollectionDetail } = useDetail()

  useEffect(() => {
    const existing = collections.find(c => String(c.id_collection) === String(id))
    // If the collection is not in collections, we look for it in the database, if not we simply use setCollectionDetail
    if (existing) {
      setCollectionDetail(existing)
    } else {
      const fetchCollection = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/collections/${id}`)
          if (!response.ok) throw new Error('Network response was not ok')
          const data = await response.json()
          setCollectionDetail(...data)
        } catch (error) {
          console.error('Error fetching collection:', error)
        }
      }
      fetchCollection()
    }
    setAlternate('')
  }, [])

  if (!collectionDetail) return <p className='loading'>Loading...</p>

  return <YourPhotoColletions photos={collectionDetail} />
}

export default CollectionDetail
