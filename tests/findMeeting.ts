import {connectDB} from '../db/index';
import Meeting from '../models/meeting';

const findMeeting = async() => {
    await connectDB();

    try{
        const meeting = await Meeting.findOne({title: 'Team Sync'});
        console.log('Meeting found: ', meeting);
    }catch (error){
        console.error('Error finding meeting: ', error);
    }
};

findMeeting();