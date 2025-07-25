import fetchAll from '../fetchAll'
import { useModalCollection } from './hooksModalCollection'

function useHandleMethods ({ setColletions, setOpenModal }) {
  const { collectionName, setCollectionName } = useModalCollection()

  const capitalizeName = (name) => {
    if (!name) return ''
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  const handleBtnSave = () => {
    const id_collection = Date.now()
    const formattedName = capitalizeName(collectionName || 'Untitled')
    setColletions((prevCollections) => ([
      ...prevCollections,
      {
        id_collection,
        name: formattedName,
        images: []
      }
    ]))
    setOpenModal(false)
    const url = `${import.meta.env.VITE_API_URL}/collections`
    const method = 'POST'
    const credentials = 'include'
    const body = JSON.stringify({
      name: formattedName,
      id_collection
    })

    fetchAll({ url, method, credentials, body })
  }

  const handleInputChange = (e) => {
    setCollectionName(e.target.value)
  }

  return {
    handleBtnSave,
    handleInputChange,
    collectionName
  }
}

export default useHandleMethods
