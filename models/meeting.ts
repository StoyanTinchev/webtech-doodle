import mongoose, { Document, Schema } from 'mongoose';

export interface IMeeting {
  id: string;
  title: string;
  ownerName: string;
  dateFrom: string;
  dateTo: string;
  optionIds: string[];
}

const meetingSchema = new Schema(
  {
    title: { type: String, required: true },
    ownerName: { type: String, required: true },
    dateFrom: { type: String, required: true },
    dateTo: { type: String, required: true },
    optionIds: [{ type: String, required: true }],
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

meetingSchema.virtual('id').get(function (this: any) {
  return this._id.toHexString();
});

const Meeting = mongoose.model<IMeeting & Document>('Meeting', meetingSchema);

export default Meeting;
