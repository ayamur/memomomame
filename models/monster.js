import mongoose from 'mongoose'

const Schema = mongoose.Schema

const monsterSchema = new Schema({
  ownerGive: { type: Schema.Types.ObjectId, ref: "Profile" },
  ownerGet: { type: Schema.Types.ObjectId, ref: "Profile" },
  monster: {type: String, enum: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']},
  message: { type: Schema.Types.ObjectId, ref: 'Message', required: true }
}, {
  timestamps: true,
})

const Monster = mongoose.model('Monster', monsterSchema)

export {
  Monster
}