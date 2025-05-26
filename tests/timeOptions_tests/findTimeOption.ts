import { connectDB, disconnectDB } from '../../db/index';
import TimeOption from '../../models/timeOption';
import Meeting from '../../models/meeting';

const findTimeOptions = async () => {
    await connectDB();

    try {
        const meeting = await Meeting.findOne({ title: 'Project Kickoff' });

        if (!meeting) {
            console.log('No meeting found with the given title.');
            return;
        }

        const options = await TimeOption.find({ meetingId: meeting._id });

        if (options.length > 0) {
            console.log('TimeOptions for the meeting:', options);
        } else {
            console.log('No TimeOptions found for this meeting.');
        }
    } catch (error) {
        console.error('Error finding TimeOptions:', error);
    } finally {
        await disconnectDB();
    }
};

findTimeOptions();
