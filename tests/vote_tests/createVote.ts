import { connectDB, disconnectDB } from '../../db/index';
import Vote from '../../models/vote';
import Meeting from '../../models/meeting';
import TimeOption from '../../models/timeOption';

const createVote = async () => {
    await connectDB();

    try {
        const meeting = await Meeting.findOne({ title: 'Team Sync' });
        if (!meeting) {
            console.error('Meeting not found!');
            return;
        }

        const timeOption = await TimeOption.findOne({ meetingId: meeting.id });
        if (!timeOption) {
            console.error('TimeOption not found for meeting!');
            return;
        }

        const newVote = new Vote({
            meetingId: meeting.id,
            optionId: timeOption.id,
            userName: 'Olya Atanasova',
        });

        const savedVote = await newVote.save();
        console.log('Vote created:', savedVote);
    } catch (error) {
        console.error('Error creating vote:', error);
    }finally{
        await disconnectDB();
    }
};

createVote();
