import connectMongoDatabase from './configs/database-connection'
import env from './configs/env'
import app from './configs/app'

connectMongoDatabase().then((): void => {
  app.listen(env.PORT, () => console.log('Server works'))
})
