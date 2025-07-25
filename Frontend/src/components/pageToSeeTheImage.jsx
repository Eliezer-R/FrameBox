import { useCollectionsContext } from '../contexts/CollectionsContext'
import ModalAddCollection from './modalAddColletion'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import { ContainerYourCollections } from './conteinerYourcolletions'
import fetchAll from '../fetchAll'
import useSeeToImgContent from '../hooks/hooksSeeToImgContent'
import useLogicSeeToImgContent from '../hooks/logicSeeToImgContent'
import { download } from '../downloadFunc'

function SeeToImgContent () {
  const { collections, clickImg, setCollections, setAlternate } = useCollectionsContext()
  // hooks
  const {
    modalAddCollection,
    setDataClick,
    dataClick,
    setModalAddCollection,
    filterCollections,
    setFilterCollections
  } = useSeeToImgContent({ clickImg })

  const { useDayUserPublish, handleRemoveCollection } = useLogicSeeToImgContent({ setFilterCollections, filterCollections })

  const url = `${import.meta.env.VITE_API_URL}/collections`
  const method = 'GET'
  const credentials = 'include'

  // we recover our collections
  useEffect(() => {
    if (!collections || collections.length === 0) {
      fetchAll({ url, method, credentials, onSuccess: setCollections })
    }
  }, [])

  // Retrieves the data of the clicked image in localStorage
  useEffect(() => {
    setDataClick(() => JSON.parse(localStorage.getItem('imgData')) || {})
    setAlternate('')
    setFilterCollections(collections)
  }, [collections])

  return (
    <>

      <div className='content-click-img'>
        <div style={{ backgroundImage: `url(${dataClick.imgData?.urls?.regular})` }} />
        <div className='content-publish'>
          <div className='user-publish'>
            <div>
              <img src={dataClick.imgData?.user?.profile_image?.small} alt={dataClick.imgData?.user?.first_name} />
              <span>{dataClick.imgData?.user?.name}</span>
            </div>
            <p>Publish on {useDayUserPublish(dataClick.imgData?.user?.updated_at)}</p>
          </div>
          <div className='download-or-colletion'>
            <button className='colletion-btn' onClick={() => setModalAddCollection(true)}>
              <img src='/resources/Plus.svg' alt='plus' />
              <span>Add to colletion</span>
            </button>
            <button
              className='download-btn'
              onClick={() => download(dataClick) }
            >
              <img src='/resources/down arrow.svg' alt='arrow' />
              <span>Download</span>
            </button>
          </div>
          <div className='your-colletions-content'>
            <h2>Colletions</h2>
            <div className='your-colletions'>
              <ContainerYourCollections
                collections={filterCollections}
                plusOrMinImg='/resources/Remove.svg'
                textAddOrRemove='Remove'
                onItemClick={handleRemoveCollection}
              />
            </div>
          </div>
        </div>
      </div>

      {modalAddCollection && createPortal(
        <ModalAddCollection
          setOpenModal={setModalAddCollection}
          imgDataClick={dataClick}
          collections={collections}
        />,
        document.body)}
    </>
  )
}

export default SeeToImgContent
