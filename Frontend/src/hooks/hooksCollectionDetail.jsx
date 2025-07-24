import { useState } from 'react'

export const useDetail = () => {
  const [collectionDetail, setCollectionDetail] = useState(null)

  return {
    collectionDetail,
    setCollectionDetail
  }
}
