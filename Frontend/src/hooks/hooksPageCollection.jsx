import { useState } from 'react'
export const useMethodModal = () => {
  const [openModal, setOpenModal] = useState(false)

  return {
    openModal,
    setOpenModal
  }
}
