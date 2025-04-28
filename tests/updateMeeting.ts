import {connectDB} from '../db/index';
import Meeting from '../models/meeting'

const updateMeeting = async() => {
    await connectDB();

    try{
        const updatedMeeting = await Meeting.findOneAndUpdate(
            {title: 'Team Sync'},
            {title: 'Team Weakly Sync'},
            {new: true}
        );

        console.log('Meeting updated: ', updatedMeeting);
    } catch(error){
        console.error('Error updating meeting: ', error);
    }
};

updateMeeting();