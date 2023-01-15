import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = new Schema({
  phrase: { type: String, required: true },
  ownerGive: { type: Schema.Types.ObjectId, ref: "Profile" }
}, {
  timestamps: true,
})

const Message = mongoose.model('Message', messageSchema)

export {
  Message
}