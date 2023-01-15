import {Message} from "../models/message.js"

function newMessage(req, res) {
  Message.find({})
  .then(messages => {
    res.render('messages/new', {
      title: "Add Message",
      messages: messages,
    })
  })
  .catch(err => {
    res.redirect("/messages")
  })
}

function create(req, res) {
  Message.create(req.body)
  .then(message => {
    res.redirect("/messages/new")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/messages/new")
  })
}


export {
  newMessage as new,
  create
}