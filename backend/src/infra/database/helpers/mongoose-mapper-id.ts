import { Schema } from 'mongoose'

export const mongoMapperId = (schema: Schema): void => {
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
  })
}
