import { Router } from 'express'
import * as monstersCtrl from '../controllers/monsters.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', monstersCtrl.index)

router.get('/:id', monstersCtrl.show)

router.get('/:id/edit', isLoggedIn, monstersCtrl.edit)

router.get('/:monsterId/comments/:letterId/edit', isLoggedIn, monstersCtrl.editLetter)

router.post('/', isLoggedIn, monstersCtrl.create)

router.post('/:id/comments', isLoggedIn, monstersCtrl.addLetter)

router.put('/:id', isLoggedIn, monstersCtrl.update)

router.put('/:monsterId/letters/:letterId', isLoggedIn, monstersCtrl.updateLetter)

router.delete('/:id', isLoggedIn, monstersCtrl.delete)

router.delete('/:monsterId/letters/:letterId', isLoggedIn, monstersCtrl.deleteLetter)

export {
  router
}