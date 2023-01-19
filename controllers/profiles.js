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
      title: `messengers ${profile.name}'s profile`,
      profile,
      isSelf,
      getRandomMessenger: () => {
        const messengers = ["🥶", "😶‍🌫️", "🫠", "😵‍💫", "🤐", "🥴", "😈", "👿", "👹", "👺", "👻", "💀", "☠️", "👽", "👾", "🎃", "👿", "👹", "🙀", "👁", "🥷", "🦹‍♂️", "🧙‍♂️", "🧝‍♀️", "🧛", "🧟‍♀️", "🧞", "🧜‍♀️", "🧜‍♂️", "🧚‍♀️", "🧚", "🧌", "👥", "👓", "👩🏻‍🎤", "👨🏼‍🚀", "🧑🏽‍🎨", "🧜🏾", "🧚🏿‍♂️", "🦇", "🐯", "🐸", "🐺", "🦄", "🦋", "🕷", "🦂", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦞", "🦀", "🐡", "🐳", "🦈", "🐊", "🦓", "🦧", "🦣", "🦒", "🦘", "🐏", "🦙", "🐐", "🦌", "🐕", "🐈‍⬛", "🦤", "🐇", "🦝", "🦦", "🦥", "🦔", "🐉", "🌵", "🌞", "🌛", "🌜", "☃️", "🤺", "🎭", "🛸", "🗿", "🩻", "🪬", "⚰️", "🧸", "🪆", "🪅", "📧", "💌", "📎", "☢️", "☣️", "👁‍🗨", "🃏", "𓀂", "𓀃", "𓀋", "𓀊", "𓀌", "𓀏", "𓀖", "𓀛", "🏴‍☠️", "🫧", "🪪", "( ͡👁️ ͜ʖ ͡👁️)", "¯\_( ͡👁️ ͜ʖ ͡👁️)_/¯", "¯\_( ͡👁️ ‿‿ ͡👁️)_/¯", "(👍 ͡👁️ ‿‿ ͡👁️)👍", "\( ͡👁️ ‿‿ ͡👁️)/", "\( ͡ಥ ‿‿ ͡ಥ)/", "\( ͡▀̿ ̿ ω ͡▀̿ ̿ )/", "\( ͡ಠ 益 ͡ಠ)/", "(╯ ͡° ෴͡° )╯┻━┻", "(✿ ͡° ‿っ͡° )", "(っ ͡◎ ‿っ͡◎ )っ🎔", "ᕙ( ͡◕ ‿っ͡◕ )ᕗ", "💪( ͡╥ ▿͡╥ ҂)", "✍( ͡❛ ⍙͡❛ )", "👋≧◉ᴥ◉≦", "(̶◉͛‿◉̶)", "(>‿◠)✌", "≧◉◡◉≦", "(͠≖ ͜ʖ͠≖)👌", "🏂", "🤖", "🥸", "🔥", "🌊", "🥏", "🕴", "🛞", "🪂", "🎑", "☠", "🖼", "✴", "🚼", "🛂",]
        return messengers[Math.floor(Math.random() * messengers.length)]
      }
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/profiles")
  })
}

function createMessenger(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.messengers.push(req.body)
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

function deleteMessenger(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.messengers.remove({_id: req.params.id})
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

function edit(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    res.render('profiles/edit', {
      profile,
      title: 'edit Profile'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
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
      throw new Error('🚫 Prohibited by The Order of the Druidic Monstrous Creature Sanctuary 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

export {
  index,
  show,
  createMessenger,
  deleteMessenger,
  edit,
  update
}