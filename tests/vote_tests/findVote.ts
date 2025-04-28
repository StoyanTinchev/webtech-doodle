import { connectDB } from '../../db/index';
import Vote from '../../models/vote';

const findVote = async () => {
    await connectDB();

    try {
        const vote = await Vote.findOne({ userName: 'Olya Atanasova' });
        if (vote) {
            console.log('Vote found:', vote);
        } else {
            console.log('No vote found for this user.');
        }
    } catch (error) {
        console.error('Error finding vote:', error);
    }
};

findVote();
