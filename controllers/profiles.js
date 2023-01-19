import { Profile } from "../models/profile.js"


function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: "🐱"
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
      title: `🐱 ${profile.name}'s profile`,
      profile,
      isSelf,
      getRandomQuote: () => {
        const quotes = ["🥶", "😶‍🌫️", "🫠", "😵‍💫", "🤐", "🥴", "😈", "👿", "👹", "👺", "👻", "💀", "☠️", "👽", "👾", "🎃", "👿", "👹", "🙀", "👁", "🥷", "🦹‍♂️", "🧙‍♂️", "🧝‍♀️", "🧛", "🧟‍♀️", "🧞", "🧜‍♀️", "🧜‍♂️", "🧚‍♀️", "🧚", "🧌", "👥", "👓", "👩🏻‍🎤", "👨🏼‍🚀", "🧑🏽‍🎨", "🧜🏾", "🧚🏿‍♂️", "🦇", "🐯", "🐸", "🐺", "🦄", "🦋", "🕷", "🦂", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦞", "🦀", "🐡", "🐳", "🦈", "🐊", "🦓", "🦧", "🦣", "🦒", "🦘", "🐏", "🦙", "🐐", "🦌", "🐕", "🐈‍⬛", "🦤", "🐇", "🦝", "🦦", "🦥", "🦔", "🐉", "🌵", "🌞", "🌛", "🌜", "☃️", "🤺", "🎭", "🛸", "🗿", "🩻", "🪬", "⚰️", "🧸", "🪆", "🪅", "📧", "💌", "📎", "☢️", "☣️", "👁‍🗨", "🃏", "𓀂", "𓀃", "𓀋", "𓀊", "𓀌", "𓀏", "𓀖", "𓀛", "🏴‍☠️", "🫧", "🪪", "( ͡👁️ ͜ʖ ͡👁️)", "¯\_( ͡👁️ ͜ʖ ͡👁️)_/¯", "¯\_( ͡👁️ ‿‿ ͡👁️)_/¯", "(👍 ͡👁️ ‿‿ ͡👁️)👍", "\( ͡👁️ ‿‿ ͡👁️)/", "\( ͡ಥ ‿‿ ͡ಥ)/", "\( ͡▀̿ ̿ ω ͡▀̿ ̿ )/", "\( ͡ಠ 益 ͡ಠ)/", "(╯ ͡° ෴͡° )╯┻━┻", "(✿ ͡° ‿っ͡° )", "(っ ͡◎ ‿っ͡◎ )っ🎔", "ᕙ( ͡◕ ‿っ͡◕ )ᕗ", "💪( ͡╥ ▿͡╥ ҂)", "✍( ͡❛ ⍙͡❛ )", "👋≧◉ᴥ◉≦", "(̶◉͛‿◉̶)", "(>‿◠)✌", "≧◉◡◉≦", "(͠≖ ͜ʖ͠≖)👌", "🏂", "🤖", "🥸", "🔥", "🌊", "🥏", "🕴", "🛞", "🪂", "🎑", "☠", "🖼", "✴", "🚼", "🛂"]
        return quotes[Math.floor(Math.random() * quotes.length)]
      }
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/profiles")
  })
}

function createQuote(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.quotes.push(req.body)
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

function deleteQuote(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.quotes.remove({_id: req.params.id})
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

export {
  index,
  show,
  createQuote,
  deleteQuote
}