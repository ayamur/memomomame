import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()


router.get('/', isLoggedIn, profilesCtrl.index)

router.get('/:id', isLoggedIn, profilesCtrl.show)

router.get('/:id/edit', isLoggedIn, profilesCtrl.edit)

router.post('/profiles/:id/monsters', isLoggedIn, profilesCtrl.createMonster)

router.put('/profiles/monsters/:id', isLoggedIn, profilesCtrl.update)

router.delete('/profiles/monsters/:id', isLoggedIn, profilesCtrl.deleteMonster)

export {
  router
}