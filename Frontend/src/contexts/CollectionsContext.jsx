import { createContext, useContext, useState } from 'react'

const CollectionsContext = createContext()

export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState([])
  const [alternate, setAlternate] = useState('home')
  const [clickImg, setClickImg] = useState({
    imgData: {}
  })

  return (
    <CollectionsContext.Provider value={{
      collections,
      setCollections,
      alternate,
      setAlternate,
      clickImg,
      setClickImg
    }}
    >
      {children}
    </CollectionsContext.Provider>
  )
}

export const useCollectionsContext = () => useContext(CollectionsContext)
