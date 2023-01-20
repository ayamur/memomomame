import { Profile } from '../models/profile.js'


function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: 'All Profiles!'
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
      title: ` ${profile.name}'s Profile! `,
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
    res.redirect('/profiles')
  })
}

function createQuote(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.quotes.unshift(req.body)
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



















//? Icebox Feature Freeze Code I was working on below!



















//! Icebox Feature Freeze Code I was working on below!





  // function editQuote(req,res) {
  //   Profile.findById(req.params.profileId)
  //   .then(profile => {
  //     const quoteDoc = profile.quotes.id(req.params.commentId)
  //     if (quoteDoc.quoter.equals(req.user.profile._id)) {
  //       res.render('profiles/editQuote', {
  //         profile, 
  //         quote: quoteDoc,
  //         title: 'Update Quote!'
  //       })
  //     } else {
  //       throw new Error('🚫 Prohibited by The Order of the Motivation and Encouragement of Amazing Humanoids Society and Sanctuary 🚫')
  //     }
  //   })
  // }
  
  
  // function updateQuote(req, res) {
  //   Profile.findById(req.params.postId)
  //   .then(profile => {
  //     const quoteDoc = profile.quotes.id
  //     (req.params.quoteId)
  //     if (quoteDoc.quoter.equals(req.user.profile._id)) {
  //       quoteDoc.set(req.body)
  //       profile.save()
  //       .then(() => {
  //         res.redirect(`/profiles/${profile._id}`)
  //       })
  //       .catch(err => {
  //         console.log(err)
  //         res.redirect('/profiles')
  //       })
  //     } else {
  //       throw new Error('🚫 Prohibited by The Order of the Motivation and Encouragement of Amazing Humanoids Society and Sanctuary 🚫')
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     res.redirect('/profiles')
  //   })
  // }
  
  // function editQuote(req, res) {
  //   console.log("this is my edit quote function")
  //   Profile.findById(req.params.id)
  //   .then(profile => {
  //     res.render('profiles/editQuote', {
  //       profile,
  //       title: 'Update Quote'
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     res.redirect(`/profiles/${req.user.profile._id}`)
  //   })
  // }
  
  // function editQuote(req, res) {
  //   console.log("this is my edit quote function")
  //   Profile.findById(req.params.id)
  //   .then(profile => {
  //     res.render('____', {
  //       profile,
  //       title: 'Update Quote'
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     res.redirect(`/profiles/${req.user.profile._id}`)
  //   })
  // }
  
  // function updateQuote(req, res) {
  //   Profile.findById(req.params.id)
  //   .then(quote => {
  //     if (quote.quoter.equals(req.user.profile._id)) {
  //       profile.updateOne(req.body)
  //       .then(()=> {
  //         res.redirect(`/profiles/editQuote`)
  //       })
  //     } else {
  //       throw new Error('🚫 Not authorized 🚫')
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     res.redirect('/profiles')
  //   })
  // }