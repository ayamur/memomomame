import { Message } from '../models/message.js'

function index(req, res) {
  Message.find({})
  .then(messages => {
    res.render('messages/index', {
      title: 'Messages Inc',
      messages
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Message.create(req.body)
  .then(message => {
    res.redirect('/messages')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/messages')
  })
}

function show(req, res) {
  Message.findById(req.params.id)
  .populate('name')
  .populate('owner')
  .then(message => {
    res.render('messages/show', {
      title: "Message TV",
      message
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/messages')
  })
}

function edit(req, res) {
  Message.findById(req.params.id)
  .then(message => {
    res.render('messages/edit', {
      message,
      title: 'edit Message'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/messages')
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
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/messages')
  })
}

function deleteMessage(req, res) {
  Message.findById(req.params.id)
  .then(message => {
    if (message.owner.equals(req.user.profile._id)) {
      message.delete()
      .then(()=> {
        res.redirect(`/messages`)
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/messages')
  })
}

export {
  index,
  create,
  show,
  edit,
  update,
  deleteMessage as delete
}