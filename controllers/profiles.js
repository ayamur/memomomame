import { Profile } from "../models/profile.js"

function newProfile(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render("profiles/new", {
      title: "Add Profile Test 123",
      profiles: profiles
    })
  })
  .catch(err => {
    res.redirect("/profiles")
  })
}

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render("profiles/index", {
      profiles,
      title: "test123 profile index"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id;
  Profile.create(req.body)
  .then(profile => {
    res.redirect("/profiles")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/profiles")
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate("owner")
  .then(monster => {
    res.render("profiles/show", {
      profile,
      title: "Profile test 123 show"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/profiles")
  })
}

function edit(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    res.render("profiles/edit", {
      profile,
      title: "123 profile edit test"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/profiles")
  })
}

function update(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    if (profile.owner.equals(req.user.profile._id)) {
      profile.updateOne(req.body)
      .then(()=> {
        res.redirect(`/profiles/${profile._id}`)
      })
    } else {
      throw new Error(`🚫 Not authorized 🚫`)
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles`)
  })
}

function deleteProfile(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    if (profile.owner.equals(req.user.profile._id)) {
      profile.delete()
      .then(() => {
        res.redirect("/profiles")
      })
    } else {
      throw new Error ("🚫 Not authorized 🚫")
    }   
  })
  .catch(err => {
    console.log(err)
    res.redirect("/profiles")
  })
}

export {
  newProfile as new,
  index,
  create,
  show,
  edit,
  update,
  deleteProfile as delete,
}