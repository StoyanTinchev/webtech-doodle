import { connectDB } from '../../db/index';
import Vote from '../../models/vote';
import Meeting from '../../models/meeting';
import TimeOption from '../../models/timeOption';
import mongoose from 'mongoose'; 

const createVote = async () => {
    await connectDB();

    const meeting = await Meeting.findOne({ title: 'Team Sync' });
    const option = await TimeOption.findOne({ hour: 16 }); 

    if (!meeting || !option) {
        console.error('Meeting or TimeOption not found!');
        return;
    }

    const newVote = new Vote({
        meetingId: meeting._id,
        optionId: option._id,
        userName: 'Olya Atanasova',
    });

    try {
        const savedVote = await newVote.save();
        console.log('Vote created:', savedVote);
    } catch (error) {
        console.error('Error creating vote:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB connection closed');
    }
};

createVote();
