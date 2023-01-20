import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.delete('/quotes/:id', isLoggedIn, profilesCtrl.deleteQuote)
router.post('/:id/quotes', isLoggedIn, profilesCtrl.createQuote)

export {
  router
}










//? Icebox Feature Freeze Code I was working on below!
















//! Icebox Feature Freeze Code I was working on below!





// router.get('/:profileId/quotes/:quoteId/edit', isLoggedIn, profilesCtrl.editQuote)
// router.put('/:profileId/quotes/:quoteId', isLoggedIn, profilesCtrl.updateQuote)