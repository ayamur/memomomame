import { Monster } from "../models/monster.js"

function newMonster(req, res) {
  Monster.find({})
  .then(monsters => {
    res.render("monsters/new", {
      title: "Add Monster 123 Test",
      monsters: monsters
    })
  })
  .catch(err => {
    res.redirect("/monsters")
  })
}

function index(req, res) {
  Monster.find({})
  .then(monsters => {
    res.render("monsters/index", {
      monsters,
      title: "test123"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id;
  Monster.create(req.body)
  .then(monster => {
    res.redirect("/monsters")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/monsters")
  })
}

function show(req, res) {
  Monster.findById(req.params.id)
  .populate("owner")
  .then(monster => {
    res.render("monsters/show", {
      monster,
      title: "Monster show"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/monsters")
  })
}

function edit(req, res) {
  Monster.findById(req.params.id)
  .then(monster => {
    res.render("monsters/edit", {
      monster,
      title: "monster edit test"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/monsters")
  })
}

function update(req, res) {
  Monster.findById(req.params.id)
  .then(monster => {
    if (monster.owner.equals(req.user.profile._id)) {
      monster.updateOne(req.body)
      .then(()=> {
        res.redirect(`/monsters/${monster._id}`)
      })
    } else {
      throw new Error(`🚫 Not authorized 🚫`)
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/monsters`)
  })
}

function deleteMonster(req, res) {
  Monster.findById(req.params.id)
  .then(monster => {
    if (monster.owner.equals(req.user.profile._id)) {
      monster.delete()
      .then(() => {
        res.redirect("/monsters")
      })
    } else {
      throw new Error ("🚫 Not authorized 🚫")
    }   
  })
  .catch(err => {
    console.log(err)
    res.redirect("/monsters")
  })
}

export {
  newMonster as new,
  index,
  create,
  show,
  edit,
  update,
  deleteMonster as delete,
}