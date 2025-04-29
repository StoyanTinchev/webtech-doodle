import mongoose, { Document, Schema } from 'mongoose';

export interface IVote {
  id: string;
  meetingId: string;
  optionId: string;
  userName: string;
}

const voteSchema = new Schema(
  {
    meetingId: { type: String, required: true },
    optionId: { type: String, required: true },
    userName: { type: String, required: true },
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

voteSchema.virtual('id').get(function (this: any) {
  return this._id.toHexString();
});

const Vote = mongoose.model<IVote & Document>('Vote', voteSchema);

export default Vote;
