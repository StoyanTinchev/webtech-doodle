import { connectDB } from '../../db/index';
import User from '../../models/user';

const deleteUser = async () => {
    await connectDB();

    try {
        const result = await User.deleteOne({ email: 'olya@email.com' });
        
        if (result.deletedCount > 0) {
            console.log('User deleted: ', { email: 'olya@email.com' });
        } else {
            console.log('No user found with this email to delete');
        }
    } catch (error) {
        console.error('Error deleting user: ', error);
    }
};

deleteUser();
