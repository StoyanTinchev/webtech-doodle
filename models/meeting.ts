import mongoose, {Document, Schema} from 'mongoose';

export interface IMeeting {
    id: string;
    title: string;
    ownerId: string;
    dateFrom: string;      // ISO8601 string
    dateTo: string;        // ISO8601 string
}

const meetingSchema = new Schema(
    {
        title: {type: String, required: true},
        ownerId: {type: String, required: true},   // reference to a User.id
        dateFrom: {type: String, required: true},
        dateTo: {type: String, required: true}
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

meetingSchema.virtual('id').get(function (this: any) {
    return this._id.toHexString();
});

const Meeting = mongoose.model<IMeeting & Document>('Meeting', meetingSchema);
export default Meeting;
