import mongoose from 'mongoose'

const Schema = mongoose.Schema

const replySchema = new Schema({
  content: String,
  support: String,
  replier: { type: Schema.Types.ObjectId, ref: "Profile" },
})

const postSchema = new Schema({
  moment: String,
  owner: { type: Schema.Types.ObjectId, ref: "Profile" },
  replies: [replySchema]
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}