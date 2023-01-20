import mongoose from 'mongoose'

const Schema = mongoose.Schema

const quoteSchema = new Schema({
  phrase: String,
  location: String,
  author: String,
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  quotes: [quoteSchema],
  quoter: { type: Schema.Types.ObjectId, ref: 'Profile' }
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}

