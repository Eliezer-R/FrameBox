function RenderCoverImgs ({ collection }) {
  // This section determines how your collection image will look if it has 1, 2 or 3 grids.
  const covers = collection.images.slice(0, 3)
  const defectCover = '/resources/foto.avif'

  // Determine the grid class based on the number of covers
  let gridClass = ''
  if (covers.length === 1 || covers.length === 0) {
    gridClass = 'cover-grid-1'
  } else if (covers.length === 2) {
    gridClass = 'cover-grid-2'
  } else if (covers.length === 3) {
    gridClass = 'cover-grid-3'
  }

  // Function for border styles based on quantity and position
  const getBorderRadius = (idx) => {
    if (covers.length === 2) {
      if (idx === 0) return '5px 0 0 5px'
      if (idx === 1) return '0 5px 5px 0'
    }
    if (covers.length === 3) {
      if (idx === 0) return '5px 0 0 5px'
      if (idx === 1) return '0 5px 0 0'
      if (idx === 2) return '0 0 5px 0'
    }
    // For 1 or 0 covers
    return '5px'
  }

  return (
    <div className={`colletionAdded-imgs-covers ${gridClass}`}>
      {covers.length === 0
        ? (
          <div
            style={{
              backgroundImage: `url(${defectCover})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100%',
              borderRadius: getBorderRadius(0)
            }}
          />
          )
        : (
            covers.map((photo, idx) => (
              <div
                key={idx}
                style={{
                  backgroundImage: `url(${photo.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: '100%',
                  borderRadius: getBorderRadius(idx)
                }}
              />
            ))
          )}
    </div>
  )
}

export default RenderCoverImgs
