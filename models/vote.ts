import mongoose, { Document, Schema } from 'mongoose';

export interface IVote {
    meetingId: mongoose.Schema.Types.ObjectId; 
    optionId: mongoose.Schema.Types.ObjectId;  
    userName: string;
}

const voteSchema: Schema = new Schema({
    meetingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required: true },
    optionId: { type: mongoose.Schema.Types.ObjectId, ref: 'TimeOption', required: true },
    userName: { type: String, required: true },
},
{ 
  versionKey: false,
});

const Vote = mongoose.model<IVote & Document>('Vote', voteSchema);

export default Vote;