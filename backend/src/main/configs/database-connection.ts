import mongoose, { Mongoose } from 'mongoose'
import env from './env'

export default async function connectMongoDatabasec (): Promise<Mongoose> {
  const connection = await mongoose.connect(env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  return connection
}
