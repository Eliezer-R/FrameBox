import RemoveOrAdd from './removeOrAdd'

export const ContainerYourCollections = ({ collections, textAddOrRemove, plusOrMinImg, onItemClick }) => {
  return (
    collections.length > 0
      ? collections.map((collection, index) => {
        const img =
            collection.images.length > 0 && collection.images[0]
              ? collection.images[0].img
              : '/resources/foto.avif'

        return (
          <div
            className='your-colletion'
            key={collection.id_collection || index}
            onClick={onItemClick ? () => onItemClick(collection.id_collection) : undefined}
          >
            <div className='your-img' style={{ backgroundImage: `url(${img})` }} />
            <div>
              <h5>{collection.name}</h5>
              <span>{collection.images.length} photos</span>
            </div>
            <RemoveOrAdd
              textAddOrRemove={textAddOrRemove}
              plusOrMinImg={plusOrMinImg}
            />
          </div>
        )
      })
      : <p>You don't have any collections yet.</p>
  )
}
