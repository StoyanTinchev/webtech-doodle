import {connectDB} from '../../db/index';
import TimeOption from '../../models/timeOption';
import Meeting from '../../models/meeting';

const createTimeOption = async () => {
    await connectDB();

    const meeting = await Meeting.findOne({title: 'Team Sync'});
    if(!meeting){
        console.log('Meeting not found!');
        return;
    }

    const newOption = new TimeOption({
        meetingId: meeting._id,
        date: '2025-05-02',
        hour: 14,
    });

    try{
        const savedTimeOption = await newOption.save();
        console.log('Time option created: ', savedTimeOption);
    }catch(error){
        console.log('Error creating new option: ', error);
    }
};

createTimeOption();