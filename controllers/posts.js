import { Post } from '../models/post.js'

function index(req, res) {
  Post.find({})
  .then(posts => {
    res.render('posts/index', {
      title: 'All the Monster Moments!',
      posts
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
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
      title: "Monster Moment!",
      post
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
      title: 'Edit Monster Moment!'
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
      post.updateOne(req.body)
      post.save()
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
  Post.findById(req.params.id)
  .then(post => {
    req.body.replier = req.user.profile._id
    post.replies.unshift(req.body)
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
        title: 'Update Sent Out Support!'
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
  edit,
  update,
  deletePost as delete,
  addReply,
  deleteReply,
  editReply,
  updateReply
}