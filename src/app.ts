import express from 'express'
import config from 'config'
import { connect } from './utils/connect'
import log from './utils/logger'
import routes from './routes'
//initiate  app
const app = express()
//get port number from config file
const port = config.get<number>('port')

app.listen(port, async () => {
  log.info(`App is running${port}`)
  await connect()
})
