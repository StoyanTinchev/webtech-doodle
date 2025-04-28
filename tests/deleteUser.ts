import {connectDB} from '../db/index';
import User from '../models/user';

const deleteUser = async() => {
    await connectDB();

    try{
        const result = await User.deleteOne({email: 'olya@email.com'});
        if(result.deletedCount > 0){
            console.log('User deleted');
        } else {
            console.log('No user found to delete');
        }
    } catch (error){
        console.log('Error deleting user: ', error);
    }
};

deleteUser();