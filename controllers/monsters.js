// import { Monster } from "../models/monster.js"
// import { Profile } from "../models/profile.js"

// function createMonster(req, res) {
//   Monster.findById(req.user.profile._id)
//   .then(profile => {
//     profile.monsters.push(req.body)
//     profile.save()
//     .then(() => {
//       res.redirect(`/monsters/${req.user.profile._id}`)
//     })
//     .catch(err => {
//       console.log(err)
//       res.redirect(`/monsters/${req.user.profile._id}`)
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect(`/monsters/${req.user.profile._id}`)
//   })
// }

// function deleteMonster(req, res) {
//   Monster.findById(req.user.profile._id)
//   .then(profile => {
//     profile.monsters.remove({_id: req.params.id})
//     profile.save()
//     .then(()=> {
//       res.redirect(`/monsters/${req.user.profile._id}`)
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect(`/monsters/${req.user.profile._id}`)
//   })
// }

// export {
//   createMonster,
//   deleteMonster
// }