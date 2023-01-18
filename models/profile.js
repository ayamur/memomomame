import mongoose from 'mongoose'

const Schema = mongoose.Schema

const monsterSchema = new Schema({
  name: String,
  breed: String,
  message: {type: Schema.Types.ObjectId, ref: "Message"}
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  monsters: [monsterSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
