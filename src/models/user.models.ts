import mongoose from 'mongoose'
import bcrypt from 'bcrypt' //password hashing library
import config from 'config'

// user input
export interface UserDocument extends mongoose.Document {
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

//create user schema for mongoose to save but need to specify the type
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

//hash password and save user 
userSchema.pre('save', async function (next) {
  var user = this as UserDocument
  if (!user.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(config.get('saltWorkFactor'))
  const hash = await bcrypt.hashSync(user.password, salt)
  user.password = hash
  return next()
})

//compare input password with password from database
userSchema.methods.comparePassWord = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument
  return bcrypt
    .compare(candidatePassword, user.password)
    .catch((error) => false)
}
//call model
const UserModel = mongoose.model('User', userSchema)
// create user using UserModel.create()
export default UserModel
