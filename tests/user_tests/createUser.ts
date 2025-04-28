import { connectDB } from '../../db/index';
import User from '../../models/user';

const createUser = async () => {
    await connectDB();

    const newUser = new User({
        name: 'Olya Atanasova',
        email: 'olya@email.com',
        passwordHash: 'some_password', 
    });

    try {
        const existingUser = await User.findOne({ email: newUser.email });
        if (existingUser) {
            console.log('User with this email already exists.');
            return; 
        }

        const savedUser = await newUser.save();
        console.log('User created: ', savedUser);
    } catch (error) {
        console.error('Error creating user: ', error);
    }
};

createUser();
