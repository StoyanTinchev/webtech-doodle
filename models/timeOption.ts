import mongoose, { Document, Schema } from 'mongoose';

export interface ITimeOption {
    meetingId: mongoose.Schema.Types.ObjectId;  
    date: string;  
    hour: number;  
}

const timeOptionSchema: Schema = new Schema({
    meetingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required: true },
    date: { type: String, required: true },  
    hour: { type: Number, required: true, min: 0, max: 23 }, 
},
{ 
  versionKey: false,
});

const TimeOption = mongoose.model<ITimeOption & Document>('TimeOption', timeOptionSchema);

export default TimeOption;