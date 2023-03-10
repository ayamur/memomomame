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
        const quotes = ["π₯Ά", "πΆβπ«οΈ", "π« ", "π΅βπ«", "π€", "π₯΄", "π", "πΏ", "πΉ", "πΊ", "π»", "π", "β οΈ", "π½", "πΎ", "π", "πΏ", "πΉ", "π", "π", "π₯·", "π¦ΉββοΈ", "π§ββοΈ", "π§ββοΈ", "π§", "π§ββοΈ", "π§", "π§ββοΈ", "π§ββοΈ", "π§ββοΈ", "π§", "π§", "π₯", "π", "π©π»βπ€", "π¨πΌβπ", "π§π½βπ¨", "π§πΎ", "π§πΏββοΈ", "π¦", "π―", "πΈ", "πΊ", "π¦", "π¦", "π·", "π¦", "π", "π¦", "π¦", "π¦", "π", "π¦", "π¦", "π¦", "π‘", "π³", "π¦", "π", "π¦", "π¦§", "π¦£", "π¦", "π¦", "π", "π¦", "π", "π¦", "π", "πββ¬", "π¦€", "π", "π¦", "π¦¦", "π¦₯", "π¦", "π", "π΅", "π", "π", "π", "βοΈ", "π€Ί", "π­", "πΈ", "πΏ", "π©»", "πͺ¬", "β°οΈ", "π§Έ", "πͺ", "πͺ", "π§", "π", "π", "β’οΈ", "β£οΈ", "πβπ¨", "π", "π", "π", "π", "π", "π", "π", "π", "π", "π΄ββ οΈ", "π«§", "πͺͺ", "( Ν‘ποΈβ―ΝΚ Ν‘ποΈ)", "Β―\_( Ν‘ποΈβ―ΝΚ Ν‘ποΈ)_/Β―", "Β―\_( Ν‘ποΈβ―βΏβΏ Ν‘ποΈ)_/Β―", "(π Ν‘ποΈβ―βΏβΏ Ν‘ποΈ)π", "\( Ν‘ποΈβ―βΏβΏ Ν‘ποΈ)/", "\( Ν‘ΰ²₯β―βΏβΏ Ν‘ΰ²₯)/", "\( Ν‘βΜΏ ΜΏβ―Ο Ν‘βΜΏ ΜΏ )/", "\( Ν‘ΰ² β―η Ν‘ΰ² )/", "(β― Ν‘Β°β―ΰ·΄Ν‘Β°β―)β―β»ββ»", "(βΏ Ν‘Β°β―βΏγ£Ν‘Β°β―)", "(γ£ Ν‘ββ―βΏγ£Ν‘ββ―)γ£π", "α( Ν‘ββ―βΏγ£Ν‘ββ―)α", "πͺ( Ν‘β₯β―βΏΝ‘β₯β―?)", "β( Ν‘ββ―βΝ‘ββ―)", "πβ§βα΄₯ββ¦", "(ΜΆβΝβΏβΜΆ)", "(>βΏβ )β", "β§ββ‘ββ¦", "(Ν β ΝΚΝ β)π", "π", "π€", "π₯Έ", "π₯", "π", "π₯", "π΄", "π", "πͺ", "π", "β ", "πΌ", "β΄", "πΌ", "π"]
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
  //       throw new Error('π« Prohibited by The Order of the Motivation and Encouragement of Amazing Humanoids Society and Sanctuary π«')
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
  //       throw new Error('π« Prohibited by The Order of the Motivation and Encouragement of Amazing Humanoids Society and Sanctuary π«')
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
  //       throw new Error('π« Not authorized π«')
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     res.redirect('/profiles')
  //   })
  // }