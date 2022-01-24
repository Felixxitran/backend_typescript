import config from 'config'
import logger from './logger'
import mongoose from 'mongoose'

//connect to mongoose
export async function connect() {
  const dbUri = config.get<string>('dbUri')
  try {
    await mongoose.connect(dbUri)
    logger.info('mongoose connected')
  } catch (error) {
    logger.info(error)
    process.exit(1)
  }
}
