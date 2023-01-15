import {Monster} from "../models/monster.js"
import {Message} from "../models/message.js"
import {Profile} from "../models/profile.js"


function newMonster(req, res){
  res.render("monsters/new", {
    title: "Send some mail!"
  })
}

function create(req, res) {
  for (const key in req.body) {
    // Key can be "title", "releaseYear", etc.
    if(req.body[key] === "") delete req.body[key]
    // req.body.releaseYear is "" so we delete it.
  }
  Monster.create(req.body)
  .then(monster => {
    res.redirect(`/monsters/${monster._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/monsters')
  })
}

function index(req, res) {
  Monster.find({})
  .then(monsters => {
    res.render('monsters/index', {
      monsters,
      title: "title here",
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

  export {
    newMonster as new,
    create,
    index
  }
