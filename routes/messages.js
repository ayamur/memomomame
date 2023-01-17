import { Router } from "express"
import * as messagesCtrl from "../controllers/messages.js"
import { isLoggedIn } from "../middleware/middleware.js"


const router = Router()

router.get("/", messagesCtrl.index)
router.get("/:id", messagesCtrl.show)
router.get("/:id/edit", isLoggedIn, messagesCtrl.edit)

router.post("/", isLoggedIn, messagesCtrl.create)

router.put("/:id", isLoggedIn, messagesCtrl.update)

router.delete("/:id", isLoggedIn, messagesCtrl.delete)

export {
  router
}