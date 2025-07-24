import { useState } from 'react'
import { ContainerYourCollections } from './conteinerYourcolletions'
import { useCollectionsContext } from '../contexts/CollectionsContext'
import fetchAll from '../fetchAll'

function ModalAddCollection ({ setOpenModal, imgDataClick, collections }) {
  const [inputValue, setInputValue] = useState('')
  const { setCollections } = useCollectionsContext()
  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(inputValue.toLowerCase())
  )

  const handleItemClick = (id) => {
    // Find the actual index by id
    const realIndex = collections.findIndex(
      c => c.id_collection === id
    )

    if (realIndex === -1) return

    // Create a new copy of the array and the selected collection
    const newCollections = [...collections]
    const updatedCollection = {
      ...newCollections[realIndex],
      images: [
        ...newCollections[realIndex].images,
        { img: imgDataClick.imgData.urls.regular }
      ]
    }
    newCollections[realIndex] = updatedCollection
    setCollections(newCollections)
    setOpenModal(false)

    const url = 'http://localhost:3000/viewImg'
    const method = 'POST'
    const body = JSON.stringify({
      id_collection: updatedCollection.id_collection,
      img: imgDataClick.imgData.urls.regular
    })
    const credentials = 'include'

    fetchAll({ url, method, body, credentials })
  }

  return (
    <div className='modal-add-colletion-container'>
      <div className='add-colletion-container'>
        <div className='remove-modal-colletion' onClick={() => setOpenModal(false)}>
          <img src='/resources/x.svg' alt='remove' />
        </div>
        <h3>Add to colletions</h3>
        <div className='content-input-add-colletion'>
          <input
            type='text'
            id='add-collection'
            name='collection-add'
            autoComplete='off'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </div>
        <span className='matches'>
          {filteredCollections.length} matches
        </span>
        <div className='container-your-colletions'>
          <ContainerYourCollections
            collections={filteredCollections}
            plusOrMinImg='/resources/Plus.svg'
            textAddOrRemove='Add to Colletion'
            onItemClick={handleItemClick}
          />
        </div>
      </div>
    </div>
  )
}
export default ModalAddCollection
