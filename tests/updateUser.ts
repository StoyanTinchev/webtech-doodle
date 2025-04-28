import {connectDB} from '../db/index';
import User from '../models/user';

const updateUser = async() => {
    await connectDB();

    try{
        const user = await User.findOneAndUpdate(
            {email: 'olya@email.com'},
            {name: 'Olya At'},
            {new: true, runValidators: true}
        );

        if(user){
            console.log('User updated: ', user);
        } else {
            console.log('No user found to update');
        }
    }catch(error){
        console.log('Error updating user: ', error);
    }
}

updateUser();