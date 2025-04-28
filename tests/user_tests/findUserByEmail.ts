import { connectDB } from '../../db/index';
import User from '../../models/user';

const findUser = async () => {
    await connectDB();

    try {
        const user = await User.findOne({ email: 'olya@email.com' });

        if (user) {
            console.log('User found: ', user);
        } else {
            console.log('No user found with this email');
        }
    } catch (error) {
        console.error('Error finding user: ', error);
    }
};

findUser();
