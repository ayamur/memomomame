import { Profile } from "../models/profile.js"


function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: "profiles index"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render("profiles/show", {
      title: `monsters ${profile.name}'s profile`,
      profile,
      isSelf,
      getRandomMonster: () => {
        // const monsters = ["/assets/images/emote-alien4.png", "/assets/images/emote-annie4.png", "public/assets/images/emote-apsycho1.png", "public/assets/images/emote-bela2.png", "/assets/images/emote-billyidol.png", "/public/assets/images/emote-bowie-ashes.png", "/assets/images/emote-dracula2.png", "/assets/images/emote-hellraiser.png"]
        // return monsters[Math.floor(Math.random() * monsters.length)]
      }
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/profiles")
  })
}

function createMonster(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.monsters.push(req.body)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function deleteMonster(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.monsters.remove({_id: req.params.id})
    profile.save()
    .then(()=> {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

export {
  index,
  show,
  createMonster,
  deleteMonster
}