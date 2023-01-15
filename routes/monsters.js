import { Router } from 'express'
import * as monstersCtrl from '../controllers/monsters.js'
import { isLoggedIn } from "../middleware/middleware.js"

const router = Router()

//localhost:3000/monsters

//GET localhost:3000/monsters
router.get('/', monstersCtrl.index)

//GET localhost:3000/monsters/index
router.get('/index', monstersCtrl.index)

export{
  router
}