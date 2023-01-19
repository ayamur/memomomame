import { Monster } from '../models/monster.js'

function index(req, res) {
  Monster.find({})
  .then(monsters => {
    res.render('monsters/index', {
      title: 'Monsters Inc',
      monsters
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.reciever = req.user.profile._id
  Monster.create(req.body)
  req.body.giver = req.user.profile._id
  Monster.create(req.body)
  .then(monster => {
    res.redirect('/monsters')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/monsters')
  })
}

function show(req, res) {
  Monster.findById(req.params.id)
  .populate('reciever')
  .populate('messages.giver')
  .then(monster => {
    res.render('monsters/show', {
      title: "Monsters TV",
      monster
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/monsters')
  })
}

function edit(req, res) {
  Monster.findById(req.params.id)
  .then(monster => {
    res.render('monsters/edit', {
      monster,
      title: 'edit Message'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/monsters')
  })
}

function update(req, res) {
  Monster.findById(req.params.id)
  .then(monster => {
    if (monster.reciever.equals(req.user.profile._id)) {
      monster.updateOne(req.body)
      .then(()=> {
        res.redirect(`/meonsters/${monsters._id}`)
      })
    } else {
      throw new Error('🚫 Prohibited by The Order of the Druidic Monstrous Creature Sanctuary 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/monsters')
  })
}

function deleteMonster(req, res) {
  Monster.findById(req.params.id)
  .then(monster => {
    if (monster.reciever.equals(req.user.profile._id)) {
      monster.delete()
      .then(()=> {
        res.redirect(`/monsters`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/monsters')
      })
    } else {
      throw new Error('🚫 Prohibited by The Order of the Druidic Monstrous Creature Sanctuary 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/monsters')
  })
}

function addMessage(req, res) {
  Monster.findById(req.params.id)
  .then(monster => {
    req.body.giver = req.user.profile._id
    monster.messages.push(req.body)
    monster.save()
    .then(()=> {
      res.redirect(`/monsters/${monster._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/monsters')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/monsters')
  })
}

function deleteMessage(req, res) {
  Momster.findById(req.params.monsterId)
  .then(monster => {
    const messageDoc = monster.messages.id(req.params.messageId)
    if (messageDoc.giver.equals(req.user.profile._id)) {
      monster.messages.remove(messageDoc)
      monster.save()
      .then(() => {
        res.redirect(`/monsters/${monster._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/monsters')
      })
    } else {
      throw new Error('🚫 Prohibited by The Order of the Druidic Monstrous Creature Sanctuary 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/monsters')
  })
}

function editMessage(req, res) {
  Monster.findById(req.params.monsterId)
  .then(monster => {
    const messageDoc = monster.messages.id(req.params.messageId)
    if (messageDoc.giver.equals(req.user.profile._id)) {
      res.render('monsters/editMessage', {
        monster, 
        message: messageDoc,
        title: 'Update Message'
      })
    } else {
      throw new Error('🚫 Prohibited by The Order of the Druidic Monstrous Creature Sanctuary 🚫')
    }
  })
}

function updateMessage(req, res) {
  Monster.findById(req.params.monsterId)
  .then(monster => {
    const messageDoc = monster.messages.id(req.params.messageId)
    if (messageDoc.giver.equals(req.user.profile._id)) {
      messageDoc.set(req.body)
      monster.save()
      .then(() => {
        res.redirect(`/monsters/${monster._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/monsters')
      })
    } else {
      throw new Error('🚫 Prohibited by The Order of the Druidic Monstrous Creature Sanctuary 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/monsters')
  })
}


export {
  index,
  create,
  show,
  edit,
  update,
  deleteMonster as delete,
  addMessage,
  deleteMessage,
  editMessage,
  updateMessage
}