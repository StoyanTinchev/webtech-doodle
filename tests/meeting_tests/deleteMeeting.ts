import {connectDB} from '../../db/index';
import Meeting from '../../models/meeting';

const deleteMeeting = async() => {
    await connectDB();

    try{
        const deletedMeeting = await Meeting.findOneAndDelete({title: 'Team Weakly Sync'});
        console.log('Meeting deleted.');
    }catch (error){
        console.log('Error deleting meeting: ', error);
    }
};

deleteMeeting();