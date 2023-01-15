import {Monster} from "../models/monster.js"
import {Message} from "../models/message.js"
import {Profile} from "../models/profile.js"

function index(req, res) {
  Profile.find({})
  .populate("owner")
  .then(profiles => {
    res.render('monsters/index', {
      profiles,
      title: "title here",
      user: req.user ? req.user : null
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function newMonmes(req, res){
  console.log("monmes is being created!")
}

  export {
    index,
    newMonmes as new,
  }
