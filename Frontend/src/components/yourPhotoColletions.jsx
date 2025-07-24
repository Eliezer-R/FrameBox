// They pay to see the collection
function YourPhotoColletions ({ photos }) {
  return (
    <>
      {photos.images.length > 0
        ? (

          <div className='your-photo-collections'>
            <h1>{photos.name}</h1>
            <p>{photos.images.length} photos</p>
            <div className='photo-grid'>
              {photos.images.map((photo, index) => (
                <div key={index} className='photo-item'>
                  <img src={photo.img} alt={photos.name} />
                </div>
              ))}
            </div>
          </div>

          )

        : (

          <div className='your-photo-collections'>
            <h1>{photos.name}</h1>
            <p>{photos.images.length} </p>
          </div>

          )}
    </>
  )
}

export default YourPhotoColletions
