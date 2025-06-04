import mongoose, {Document, Schema} from 'mongoose';

export interface IVote {
    meetingId: string;  // identifies which meeting this vote belongs to
    optionId: string;   // identifies which slot they picked
    userId: string;     // references User.id
    votedAt: Date;      // timestamp when this vote was cast
}

export interface IVoteDocument extends IVote, Document {
    _id: mongoose.Types.ObjectId;
}

const voteSchema = new Schema(
    {
        meetingId: {type: String, required: true},
        optionId: {type: String, required: true},
        userId: {type: String, required: true}
    },
    {
        versionKey: false,
        timestamps: {createdAt: 'votedAt', updatedAt: false},
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret._id;
                return ret;
            }
        },
        toObject: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret._id;
                return ret;
            }
        }
    }
);

voteSchema.virtual('id').get(function (this: any) {
    return this._id.toHexString();
});

const Vote = mongoose.model<IVoteDocument>('Vote', voteSchema);
export default Vote;
