import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = new Schema({
  letter: String,
  giver: { type: Schema.Types.ObjectId, ref: "Profile"},
})

const monsterSchema = new Schema({
  name: String,
  reciever: {type: Schema.Types.ObjectId, ref: "Profile"},
  messages: [messageSchema]
}, {
  timestamps: true
})

const Monster = mongoose.model('Monster', monsterSchema)

export {
  Monster
}