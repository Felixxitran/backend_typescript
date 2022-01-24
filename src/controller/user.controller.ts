import { Request, Response } from 'express'
import { createUser } from '../service/user.function'
import log from '../utils/logger'
export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body)
  } catch (e: any) {
    log.error(e)
    return res.status(409).send(e.message)
  }
}
