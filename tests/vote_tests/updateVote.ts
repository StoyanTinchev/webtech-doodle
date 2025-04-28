import { connectDB } from '../../db/index';
import Vote from '../../models/vote';
import TimeOption from '../../models/timeOption';
import mongoose from 'mongoose';  

const updateVote = async () => {
    await connectDB();

    try {
      
        const vote = await Vote.findOne({ userName: 'Olya Atanasova' });

        if (!vote) {
            console.error('Vote not found!');
            return;
        }
        const newOption = await TimeOption.findOne({ hour: 14 });

        if (!newOption) {
            console.error('New TimeOption not found!');
            return;
        }
        const updatedVote = await Vote.findByIdAndUpdate(
            vote._id, 
            { optionId: newOption._id }, 
            { new: true } 
        );

        if (updatedVote) {
            console.log('Vote updated:', updatedVote);
        } else {
            console.error('Error updating vote: Vote not found');
        }
    } catch (error) {
        console.error('Error updating vote:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB connection closed');
    }
};

updateVote();
