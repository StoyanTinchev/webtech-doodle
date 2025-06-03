import mongoose, {Document, Schema} from 'mongoose';

export interface IUser {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    registrationDate: Date;
}

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {            // Will store passwordHash
            type: String,
            required: [true, 'Password is required'],
            minlength: 6
        },
        registrationDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false,
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret._id;
                return ret;
            },
        },
        toObject: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret._id;
                return ret;
            },
        },
    }
);

userSchema.virtual('id').get(function (this: any) {
    return this._id.toHexString();
});

const User = mongoose.model<IUser & Document>('User', userSchema);

export default User;
