export const download = (dataClick) => {
  const imageUrl = dataClick?.imgData?.urls?.regular
  if (imageUrl) {
    fetch(imageUrl, {
      mode: 'cors',
    })
      .then(res => res.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = 'unsplash-image.jpg'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(blobUrl)
      })
      .catch(err => {
        console.error('Download failed:', err)
      })
  }
}
