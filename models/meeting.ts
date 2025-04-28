import mongoose, { Document, Schema } from 'mongoose';


export interface IMeeting {
    title: string;
    ownerName: string;
    dateFrom: string;
    dateTo: string;
    optionIds: mongoose.Schema.Types.ObjectId[]; 
}

const meetingSchema: Schema = new Schema({
    title: { type: String, required: true },
    ownerName: { type: String, required: true },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
    optionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeOption' }], 
},
{ 
  versionKey: false,
});


const Meeting = mongoose.model<IMeeting & Document>('Meeting', meetingSchema);

export default Meeting;

