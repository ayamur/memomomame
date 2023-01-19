import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()


router.get('/', isLoggedIn, profilesCtrl.index)

router.get('/:id', isLoggedIn, profilesCtrl.show)

router.get('/:id/edit', isLoggedIn, profilesCtrl.edit)

router.post('/profiles/:id/messengers', isLoggedIn, profilesCtrl.createMessenger)

router.put('/profiles/messengers/:id', isLoggedIn, profilesCtrl.update)

router.delete('/messengers/:id', isLoggedIn, profilesCtrl.deleteMessenger)

export {
  router
}