import mongoose from 'mongoose'

const Schema = mongoose.Schema

const quoteSchema = new Schema({
  name: String,
  location: Number,
  author: String
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  quotes: [quoteSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}

