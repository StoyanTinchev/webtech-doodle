import { connectDB } from '../../db/index';
import Vote from '../../models/vote';
import TimeOption from '../../models/timeOption';
import Meeting from '../../models/meeting';

const updateVote = async () => {
    await connectDB();

    try {
        const meeting = await Meeting.findOne({ title: 'Team Sync' });
        if (!meeting) {
            console.error('Meeting not found.');
            return;
        }

        const newTimeOption = await TimeOption.findOne({ meetingId: meeting.id, hour: 16 });
        if (!newTimeOption) {
            console.error('New TimeOption not found.');
            return;
        }

        const vote = await Vote.findOne({ userName: 'Olya Atanasova', meetingId: meeting.id });
        if (!vote) {
            console.log('Vote not found for updating.');
            return;
        }

        vote.optionId = newTimeOption.id; 
        const updatedVote = await vote.save();
        console.log('Vote updated:', updatedVote);

    } catch (error) {
        console.error('Error updating vote:', error);
    }
};

updateVote();
