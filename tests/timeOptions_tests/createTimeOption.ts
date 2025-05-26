import { connectDB, disconnectDB } from '../../db/index';
import TimeOption from '../../models/timeOption';
import Meeting from '../../models/meeting';

const createTimeOption = async () => {
    await connectDB();

    try {
        const meeting = await Meeting.findOne({ title: 'Team Sync' });
        if (!meeting) {
            console.error('Meeting not found!');
            return;
        }

        const existingOption = await TimeOption.findOne({
            meetingId: meeting._id,
            date: '2025-05-02',
            hour: 14,
        });

        if (existingOption) {
            console.log('Time option already exists.');
            return;
        }

        const newOption = new TimeOption({
            meetingId: meeting._id,
            date: '2025-05-02',
            hour: 14,
        });

        const savedTimeOption = await newOption.save();
        console.log('Time option created: ', savedTimeOption);
    } catch (error) {
        console.error('Error creating new time option:', error);
    } finally{
        await disconnectDB();
    }
};

createTimeOption();
