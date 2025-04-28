import { connectDB } from '../../db/index';
import TimeOption from '../../models/timeOption';
import Meeting from '../../models/meeting';

const findTimeOptions = async () => {
    await connectDB();

    const meeting = await Meeting.findOne({ title: 'Team Sync' });

    if (!meeting) {
        console.error('Meeting not found!');
        return;
    }

    try {
        const options = await TimeOption.find({ meetingId: meeting._id });
        console.log('TimeOptions for meeting:', options);
    } catch (error) {
        console.error('Error finding TimeOptions:', error);
    }
};

findTimeOptions();
