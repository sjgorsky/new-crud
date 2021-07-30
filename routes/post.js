import express from 'express'
import { deleteModel } from 'mongoose'

const router = express.Router()

import { getPosts, createPost, updatePost, deletePost } from '../controllers/posts.js'

router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost) //preferred over update because it isn't overriding entire doc, rather only what it gets from req.body
router.delete('/:id', deletePost)

export default router