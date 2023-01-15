import { Router } from 'express'
import * as messagesCtrl from '../controllers/messages.js'

const router = Router()

//localhost:3000/messages

//GET localhost:3000/messages
router.get('/', messagesCtrl.create)

//GET localhost:300/messages/new
router.get('/new', messagesCtrl.new)

export{
  router
}