function useLogicSeeToImgContent ({ filterCollections, setFilterCollections }) {
  const useDayUserPublish = (updated) => {
    const date = new Date(updated)

    const day = date.getUTCDate()
    const month = date.toLocaleString('es-US', { month: 'long', timeZone: 'UTC' })
    const year = date.getUTCFullYear()

    return `${day}, ${month} ${year}`
  }

  const handleRemoveCollection = (id) => {
    setFilterCollections(filterCollections.filter((item) => item.id_collection !== id))
  }

  return {
    useDayUserPublish,
    handleRemoveCollection
  }
}

export default useLogicSeeToImgContent
