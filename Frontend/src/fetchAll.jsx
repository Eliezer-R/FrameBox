export default async function fetchAll ({ url, method, credentials, onSuccess, key, body }) {
  try {
    const options = {
      method,
      credentials,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (method !== 'GET' && body) {
      options.body = body
    }

    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error('Failed to fetch collections')
    }

    const data = await response.json()

    onSuccess?.(data)

    if (typeof window !== 'undefined' && window.localStorage && key && data) {
      const valueToStore = data.userId ? data.userId : data
      localStorage.setItem(key, JSON.stringify(valueToStore))
    }
  } catch (error) {
    console.error('Error fetching collections:', error)
  }
}
