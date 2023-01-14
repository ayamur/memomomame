import { Router } from 'express'
import * as monmessCtrl from '../controllers/monmess.js'

const router = Router()

//localhost:3000/monmess

//GET localhost:300/monmess
router.get('/new', monmessCtrl.new)

export{
  router
}