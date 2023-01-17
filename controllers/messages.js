import { Message } from "../models/message.js"

function newMessage(req, res) {
  Message.find({})
  .then(messages => {
    res.render("messages/new", {
      title: "Add Message Test 123",
      messages: messages
    })
  })
  .catch(err => {
    res.redirect("/messages")
  })
}

function index(req, res) {
  Message.find({})
  .then(messages => {
    res.render("messages/index", {
      messages,
      title: "messages index test 123"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id;
  Message.create(req.body)
  .then(message => {
    res.redirect("/messages")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/messages")
  })
}

function show(req, res) {
  Message.findById(req.params.id)
  .populate("owner")
  .then(message => {
    res.render("messages/show", {
      message,
      title: "Message Show Test 123"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/messages")
  })
}

function edit(req, res) {
  Message.findById(req.params.id)
  .then(message => {
    res.render("messages/edit", {
      message,
      title: "message edit test 123"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/messages")
  })
}

function update(req, res) {
  Message.findById(req.params.id)
  .then(message => {
    if (message.owner.equals(req.user.profile._id)) {
      message.updateOne(req.body)
      .then(()=> {
        res.redirect(`/messages/${message._id}`)
      })
    } else {
      throw new Error("🚫 Not authorized 🚫")
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/messages`)
  })
}

function deleteMessage(req, res) {
  Message.findById(req.params.id)
  .then(message => {
    if (message.owner.equals(req.user.profile._id)) {
      message.delete()
      .then(() => {
        res.redirect("/messages")
      })
    } else {
      throw new Error ("🚫 Not authorized 🚫")
    }   
  })
  .catch(err => {
    console.log(err)
    res.redirect("/messages")
  })
}

export {
  newMessage as new,
  index,
  create,
  show,
  edit,
  update,
  deleteMessage as delete,
}