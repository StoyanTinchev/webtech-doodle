import { connectDB } from '../../db/index';
import Vote from '../../models/vote';

const deleteVote = async () => {
    await connectDB();

    try {
        const vote = await Vote.findOne({ userName: 'Olya A.' });
        if (!vote) {
            console.log('Vote not found for deletion.');
            return;
        }

        await Vote.deleteOne({ _id: vote.id });
        console.log('Vote deleted successfully.');
    } catch (error) {
        console.error('Error deleting vote:', error);
    }
};

deleteVote();
