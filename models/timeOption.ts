import mongoose, {Document, Schema} from 'mongoose';

export interface ITimeOption {
    id: string;
    meetingId: string;
    date: string;    // ISO8601 date string
    hour: number;    // 0–23
}

const timeOptionSchema = new Schema(
    {
        meetingId: {type: String, required: true},
        date: {type: String, required: true},
        hour: {type: Number, required: true, min: 0, max: 23}
    },
    {
        versionKey: false,
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

timeOptionSchema.virtual('id').get(function (this: any) {
    return this._id.toHexString();
});

const TimeOption = mongoose.model<ITimeOption & Document>('TimeOption', timeOptionSchema);
export default TimeOption;
