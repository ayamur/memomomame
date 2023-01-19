import { Post } from '../models/post.js'

function index(req, res) {
  Post.find({})
  .then(posts => {
    res.render('posts/index', {
      title: '🌮',
      posts
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.sos = !!req.body.sos
  req.body.owner = req.user.profile._id
  Post.create(req.body)
  .then(post => {
    res.redirect('/posts')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function show(req, res) {
  Post.findById(req.params.id)
  .populate('owner')
  .populate('replies.replier')
  .then(post => {
    res.render('posts/show', {
      title: "🌮 show",
      post
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function sosChoice(req, res) {
  // find the post
  Post.findById(req.params.id)
  .then(post => {
    // flip the sos
    post.sos = !post.sos
    // save the post
    post.save()
    .then(() => {
      // redirect
      res.redirect(`/posts/${post._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function edit(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    res.render('posts/edit', {
      post,
      title: 'edit 🌮'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function update(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    if (post.owner.equals(req.user.profile._id)) {
      req.body.sos = !!req.body.sos
      post.updateOne(req.body)
      .then(()=> {
        res.redirect(`/posts/${post._id}`)
      })
    } else {
      throw new Error('🚫 Prohibited by The Order of the Motivation and Encouragement of Amazing Humanoids Society and Sanctuary 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function deletePost(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    if (post.owner.equals(req.user.profile._id)) {
      post.delete()
      .then(()=> {
        res.redirect(`/posts`)
      })
    } else {
      throw new Error('🚫 Prohibited by The Order of the Motivation and Encouragement of Amazing Humanoids Society and Sanctuary 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function addReply(req, res) {
  // Find the post to push the replies to
  Post.findById(req.params.id)
  .then(post => {
    // add the logged in user's profile _id to req.body before pushing into the array
    req.body.replier = req.user.profile._id
    post.replies.push(req.body)
    post.save()
    .then(()=> {
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/posts')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function deleteReply(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    const replyDoc = post.replies.id(req.params.replyId)
    if (replyDoc.replier.equals(req.user.profile._id)) {
      post.replies.remove(replyDoc)
      post.save()
      .then(() => {
        res.redirect(`/posts/${post._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/posts')
      })
    } else {
      throw new Error(' 🚫 Prohibited by The Order of the Motivation and Encouragement of Amazing Humanoids Society and Sanctuary 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function editReply(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    const replyDoc = post.replies.id(req.params.replyId)
    if (replyDoc.replier.equals(req.user.profile._id)) {
      res.render('posts/editReply', {
        post, 
        reply: replyDoc,
        title: 'Update Reply'
      })
    } else {
      throw new Error('🚫 Prohibited by The Order of the Motivation and Encouragement of Amazing Humanoids Society and Sanctuary 🚫')
    }
  })
}

function updateReply(req, res) {
  Post.findById(req.params.postId)
  .then(post => {
    const replyDoc = post.replies.id(req.params.replyId)
    if (replyDoc.replier.equals(req.user.profile._id)) {
      replyDoc.set(req.body)
      post.save()
      .then(() => {
        res.redirect(`/posts/${post._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/posts')
      })
    } else {
      throw new Error('🚫 Prohibited by The Order of the Motivation and Encouragement of Amazing Humanoids Society and Sanctuary 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

export {
  index,
  create,
  show,
  sosChoice,
  edit,
  update,
  deletePost as delete,
  addReply,
  deleteReply,
  editReply,
  updateReply
}