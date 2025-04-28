import { connectDB } from '../../db/index';
import Vote from '../../models/vote';
import mongoose from 'mongoose'; 

const deleteVote = async () => {
    await connectDB();

    try {
        const vote = await Vote.findOne({ userName: 'Olya Atanasova' });

        if (!vote) {
            console.error('Vote not found!');
            return;
        }

        await Vote.deleteOne({ _id: vote._id });
        console.log('Vote deleted successfully');
    } catch (error) {
        console.error('Error deleting vote:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB connection closed');
    }
};

deleteVote();
