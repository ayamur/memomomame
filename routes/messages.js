import { Router } from 'express'
import * as messagesCtrl from '../controllers/messages.js'

const router = Router()

//localhost:3000/messages

//GET localhost:300/messages
router.get('messages/new', messagesCtrl.new)

export{
  router
}