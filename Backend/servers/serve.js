import express from 'express'
import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import { db } from '../db.js'
import dotenv from 'dotenv'

const router = express.Router()
dotenv.config()

function groupCollections (rows) {
  const map = new Map()
  for (const row of rows) {
    if (!map.has(row.id_collection)) {
      map.set(row.id_collection, {
        id_collection: row.id_collection,
        name: row.name,
        images: row.url_img ? [{ img: row.url_img }] : []
      })
    } else if (row.url_img) {
      map.get(row.id_collection).images.push({ img: row.url_img })
    }
  }
  return Array.from(map.values())
}

// Helper to handle errors
function handleError(res, status = 500, message = 'Internal error') {
  return res.status(status).json({ message })
}

// Check and respond if the token is valid
async function authenticateWithToken(token, res) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    return res.json({ message: 'Authenticated', userId: decoded.id })
  } catch {
    return handleError(res, 401, 'Invalid token')
  }
}

// Renew the token if the user exists
async function renewToken(clientUserId, res) {
  const [rows] = await db.execute('SELECT id_user FROM user WHERE id_user = ?', [clientUserId])
  if (rows.length > 0) {
    const newToken = jwt.sign({ id: clientUserId }, process.env.SECRET_KEY)
    res.cookie('token', newToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 1000 * 60 * 60 * 24 * 30 })
    return res.json({ message: 'Renewed token', token: newToken, userId: clientUserId })
  }
  return null
}

// Create a new user and token
async function createNewUser(res) {
  const id = crypto.randomUUID()
  await db.execute('INSERT INTO user (id_user) VALUES (?)', [id])
  const newToken = jwt.sign({ id }, process.env.SECRET_KEY)
  res.cookie('token', newToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 1000 * 60 * 60 * 24 * 30 })
  return res.json({ message: 'New token created', token: newToken, userId: id })
}

router.post('/', async (req, res) => {
  const token = req.cookies.token
  const clientUserId = req.body.userId

  try {
    if (token) {
      return await authenticateWithToken(token, res)
    }

    if (clientUserId) {
      const renewed = await renewToken(clientUserId, res)
      if (renewed) return
    }

    return await createNewUser(res)
  } catch (error) {
    console.error(error.message)
    return handleError(res)
  }
})

router.post('/collections', async (req, res) => {
  const { name, id_collection } = req.body
  const token = req.cookies.token

  try {
    if (!token) {
      return handleError(res, 401, 'You are not authenticated')
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const userId = decoded.id

    await db.execute('INSERT INTO collections (name, user_id, id_collection) VALUES (?, ?, ?)', [name, userId, id_collection])

    res.json({ message: 'Collection created successfully' })
  } catch (error) {
    return handleError(res, 500, 'Error creating collection')
  }
})

router.post('/viewimg', async (req, res) => {
  const { img, id_collection } = req.body

  try {
    const [rows] = await db.execute('SELECT * FROM collections WHERE id_collection = ?', [id_collection])

    if (rows.length === 0) {
      return handleError(res, 404, 'Collection id not found')
    }

    await db.execute('INSERT INTO img_collections (collection_id, url_img) VALUES (?, ?)', [id_collection, img])
    res.json({ message: 'Image saved successfully' })
  } catch (error) {
    return handleError(res, 500, 'Server error, the image could not be saved')
  }
})

router.get('/viewCollections/:id', async (req, res) => {
  const { id_collection } = req.params
  try {
    const [rows] = await db.execute('SELECT * FROM img_collections WHERE collection_id = ?', [id_collection])

    if (rows.length === 0) {
      return handleError(res, 404, 'Collection not found')
    }

    res.json(rows)
  } catch (error) {
    return handleError(res, 500, 'Error getting collection')
  }
})

router.get('/collections', async (req, res) => {
  const token = req.cookies.token

  try {
    if (!token) {
      return handleError(res, 401, 'You are not authenticated')
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const userId = decoded.id

    const [rows] = await db.execute(
      'SELECT c.id_collection, c.name, i.url_img FROM collections c LEFT JOIN img_collections i ON c.id_collection = i.collection_id WHERE c.user_id = ?',
      [userId]
    )

    if (rows.length === 0) {
      return res.status(200).json([])
    }

    const result = groupCollections(rows)
    res.json(result)
  } catch (error) {
    return handleError(res, 500, 'Internal server error')
  }
})

router.get('/collections/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [rows] = await db.execute(
      'SELECT c.id_collection, c.name, i.url_img FROM collections c LEFT JOIN img_collections i ON c.id_collection = i.collection_id WHERE c.id_collection = ?',
      [id]
    )

    if (rows.length === 0) {
      return handleError(res, 404, 'Collection not found')
    }

    const result = groupCollections(rows)
    res.json(result)
  } catch (error) {
    return handleError(res, 500, 'Internal server error')
  }
})

export default router
