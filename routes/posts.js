import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', postsCtrl.index)
router.get('/:id', postsCtrl.show)
router.get('/:id/edit', isLoggedIn, postsCtrl.edit)
router.get('/:postId/replies/:replyId/edit', isLoggedIn, postsCtrl.editReply)
router.post('/', isLoggedIn, postsCtrl.create)
router.post('/:id/replies', isLoggedIn, postsCtrl.addReply)
router.patch('/:id/sos-choice', isLoggedIn, postsCtrl.sosChoice)
router.put('/:id', isLoggedIn, postsCtrl.update)
router.put('/:postId/replies/:replyId', isLoggedIn, postsCtrl.updateReply)
router.delete('/:id', isLoggedIn, postsCtrl.delete)
router.delete('/:postId/replies/:replyId', isLoggedIn, postsCtrl.deleteReply)

export {
  router
}