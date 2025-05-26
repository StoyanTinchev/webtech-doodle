import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  registrationDate: Date;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

userSchema.virtual('id').get(function (this: any) {
  return this._id.toHexString();
});

const User = mongoose.model<IUser & Document>('User', userSchema);

export default User;
