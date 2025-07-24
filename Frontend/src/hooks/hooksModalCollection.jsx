import { useState } from 'react'

export const useModalCollection = () => {
  const [collectionName, setCollectionName] = useState('')

  return {
    collectionName,
    setCollectionName
  }
}
