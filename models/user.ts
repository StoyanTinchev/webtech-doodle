import mongoose, {Document, Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
    name: string;
    email: string;
    passwordHash: string;
    registrationDate: Date;
}

export interface IUserDocument extends IUser, Document {
    _id: mongoose.Types.ObjectId;
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
        passwordHash: {
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
                delete ret.passwordHash;
                return ret;
            }
        },
        toObject: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret._id;
                delete ret.passwordHash;
                return ret;
            }
        }
    }
);

userSchema.virtual('id').get(function (this: any) {
    return this._id.toHexString();
});

const UserModel = mongoose.model<IUserDocument>('User', userSchema);
export default UserModel;

// ----------------------------------------------------------------------------
// Helper functions to be used in routes/auth.ts
// ----------------------------------------------------------------------------

/**
 * Find a user by their email address.
 *
 * @param[in]  email  Email to look up.
 * @return            Promise resolving to the user document or null.
 */
export async function findUserByEmail(
    email: string
): Promise<IUserDocument | null> {
    try {
        return await UserModel.findOne({email}).exec();
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
}

/**
 * Find a user by their MongoDB ObjectID.
 *
 * @param[in]  id  User’s ObjectID.
 * @return          Promise resolving to the user document or null.
 */
export async function findUserById(
    id: string
): Promise<IUserDocument | null> {
    try {
        return await UserModel.findById(id).exec();
    } catch (error) {
        console.error('Error finding user by id:', error);
        throw error;
    }
}

/**
 * Create a new user with hashed password.
 *
 * @param[in]  name           User’s full name.
 * @param[in]  email          User’s email (must be unique).
 * @param[in]  plainPassword  Plaintext password to hash.
 * @return                    Promise resolving to the saved user document.
 *
 * @throws                   Errors on DB failure or hashing issues.
 */
export async function createUser(
    name: string,
    email: string,
    plainPassword: string
): Promise<IUserDocument> {
    try {
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(plainPassword, salt);

        const user = new UserModel({
            name,
            email,
            passwordHash
        });
        return await user.save();
    } catch (error: any) {
        console.error('Error creating user:', error);
        throw error;
    }
}
