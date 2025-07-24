import { useCollectionsContext } from './contexts/CollectionsContext'
import ColletionAdded from './components/newColletionAdded'
import ModalColletion from './components/modalColletion'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import fetchAll from './fetchAll'
import { useMethodModal } from './hooks/hooksPageCollection'

function PageCollection () {
  const { openModal, setOpenModal } = useMethodModal()
  const { collections, setCollections, setAlternate } = useCollectionsContext()
  const url = 'http://localhost:3000/collections'
  const method = 'GET'
  const credentials = 'include'

  useEffect(() => {
    if (collections) {
      fetchAll({ url, method, credentials, onSuccess: setCollections })
    }
  }, [])

  return (
    <>
      <div className='content-collection'>
        <div className='title-collection'>
          <h1>Collections</h1>
          <p>
            Explore the world through collections of beautiful photos free to use under the{' '}
            <span className='license-title'>Unsplash License</span>
          </p>
        </div>
        <div className='image-content-collection'>
          <div className='add-image-on-content' onClick={() => setOpenModal(true)}>
            <img src='/resources/Plus.svg' alt='Plus' />
            <p>Add new collection</p>
          </div>
          {collections.length > 0 &&
            collections.map((collection, index) => (
              <ColletionAdded
                key={index}
                collection={collection}
                setAlternate={setAlternate}
              />
            ))}
        </div>
      </div>
      {openModal && createPortal(
        <ModalColletion setOpenModal={setOpenModal} setColletions={setCollections} />,
        document.body
      )}
    </>
  )
}

export default PageCollection
