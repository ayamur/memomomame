import { Router } from 'express'
import * as monstersCtrl from '../controllers/monsters.js'
import { isLoggedIn } from '../middleware/middleware.js'


const router = Router()

router.get('/', monstersCtrl.index)
router.get('/:id', monstersCtrl.show)
router.get('/:id/edit', isLoggedIn, monstersCtrl.edit)

router.post('/', isLoggedIn, monstersCtrl.create)

router.put('/:id', isLoggedIn, monstersCtrl.update)

router.delete('/:id', isLoggedIn, monstersCtrl.delete)

export {
  router
}