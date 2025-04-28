import { connectDB } from '../../db/index';
import Vote from '../../models/vote';
import Meeting from '../../models/meeting';
import mongoose from 'mongoose'; 

const findVotes = async () => {
    await connectDB();

    const meeting = await Meeting.findOne({ title: 'Team Sync' });

    if (!meeting) {
        console.error('Meeting not found!');
        return;
    }

    try {
        const votes = await Vote.find({ meetingId: meeting._id }).populate('optionId');
        console.log('Votes for meeting:', votes);
    } catch (error) {
        console.error('Error finding votes:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB connection closed');
    }
};

findVotes();
