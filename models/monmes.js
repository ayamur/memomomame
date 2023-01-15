import mongoose from 'mongoose'

const Schema = mongoose.Schema

const monmesSchema = new Schema({
  ownerGive: { type: Schema.Types.ObjectId, ref: "Profile" },
  ownerGet: { type: Schema.Types.ObjectId, ref: "Profile" },
  monster: {type: String, enum: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']},
  message: { type: String, required: true }
}, {
  timestamps: true,
})

const Monmes = mongoose.model('Monmes', monmesSchema)

export {
  Monmes
}