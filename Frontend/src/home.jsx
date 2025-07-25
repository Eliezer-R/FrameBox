import { useEffect } from 'react'
import SearchHome from './homeSearch'
import fetchAll from './fetchAll'
function Home () {
  const url = `${import.meta.env.VITE_API_URL}/`
  const method = 'POST'
  const body = JSON.stringify({ userId: localStorage.getItem('userId') || null })
  const credentials = 'include'
  const key = import.meta.env.VITE_KEY_LOCAL_STORAGE

  useEffect(() => {
    fetchAll({ url, method, body, credentials, key })
  }, [])

  return (
    <div className='home'>
      <SearchHome />
    </div>
  )
}

export default Home
