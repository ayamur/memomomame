import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageFromSchema = new Schema({
  message: String,
  giver: { type: Schema.Types.ObjectId, ref: "Profile"},
})

const messageSchema = new Schema({
  name: String,
  reciever: {type: Schema.Types.ObjectId, ref: "Profile"},
  messages: [messageFromSchema]
}, {
  timestamps: true
})

const Message = mongoose.model('Message', messageSchema)

export {
  Message
}