import mongoose, { Document, Schema } from 'mongoose';

export interface ITimeOption {
  id: string;
  meetingId: string;
  date: string;
  hour: number;
}

const timeOptionSchema = new Schema(
  {
    meetingId: { type: String, required: true },
    date: { type: String, required: true },
    hour: { type: Number, required: true, min: 0, max: 23 },
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

timeOptionSchema.virtual('id').get(function (this: any) {
  return this._id.toHexString();
});

const TimeOption = mongoose.model<ITimeOption & Document>('TimeOption', timeOptionSchema);

export default TimeOption;
