import mongoose from 'mongoose'


const Schema = mongoose.Schema

const messengerSchema = new Schema({
  name: String,
  message: {type: Schema.Types.ObjectId, ref: "Message"}
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  messengers: [messengerSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
