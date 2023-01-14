import mongoose from 'mongoose'

const Schema = mongoose.Schema

const monmesSchema = new Schema({
  name: { type: String, required: true }
}, {
  timestamps: true,
})

const Monmes = mongoose.model('Monmes', monmesSchema)

export {
  Monmes
}