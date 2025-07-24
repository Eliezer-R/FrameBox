import { useState } from 'react'

function useSeeToImgContent ({ clickImg }) {
  const [modalAddCollection, setModalAddCollection] = useState(false)
  const [dataClick, setDataClick] = useState(() => {
    const dataClick = clickImg?.imgData ? clickImg : JSON.parse(localStorage.getItem('imgData')) || {}
    return dataClick
  })
  const [filterCollections, setFilterCollections] = useState([])

  return {
    modalAddCollection,
    setModalAddCollection,
    dataClick,
    setDataClick,
    filterCollections,
    setFilterCollections
  }
}

export default useSeeToImgContent
