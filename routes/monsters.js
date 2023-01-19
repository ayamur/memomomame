import { Router } from 'express'
import * as monstersCtrl from '../controllers/monsters.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', monstersCtrl.index)

router.get('/:id', monstersCtrl.show)

router.get('/:id/edit', isLoggedIn, monstersCtrl.edit)

router.get('/:monsterId/messages/:messageId/edit', isLoggedIn, monstersCtrl.editMessage)

router.post('/', isLoggedIn, monstersCtrl.create)

router.post('/:id/messages', isLoggedIn, monstersCtrl.addMessage)

router.put('/:id', isLoggedIn, monstersCtrl.update)

router.put('/:monsterId/messages/:messageId', isLoggedIn, monstersCtrl.updateMessage)

router.delete('/:id', isLoggedIn, monstersCtrl.delete)

router.delete('/:monsterId/messages/:messageId', isLoggedIn, monstersCtrl.deleteMessage)

export {
  router
}