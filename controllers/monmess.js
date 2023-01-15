import {Monmes} from "../models/monmes.js"
import {Message} from "../models/message.js"
import {Profile} from "../models/profile.jd"

function index(req, res) {
  Profile.find({})
  .populate("owner")
  .then(profile => {
    res.render('memomomame/index', {
      profiles,
      title: "title here"
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
    newMonmes as new,
  }
