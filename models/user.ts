import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  registrationDate: Date;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
  },
  { timestamps: true,
    versionKey: false,
  });

const User = mongoose.model<IUser>('User', userSchema);

export default User;
