import mongoose from 'mongoose'

const Schema = mongoose.Schema

const monsterSchema = new Schema({
  name: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Monster = mongoose.model('Monster', monsterSchema)

export {
  Monster
}