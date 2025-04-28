import {connectDB} from '../db/index';
import Meeting from '../models/meeting';

const createMeeting = async () => {
    await connectDB();

    const newMeeting = new Meeting({
        title: 'Team Sync',
        ownerName: 'Olya Atanasova',
        dateFrom: new Date('2025-05-01T00:00:00Z'),
        dateTo: new Date('2025-05-05T00:00:00Z'),
        optionIds: [],
    });

    try{
        const savedMeeting = await newMeeting.save();
        console.log('Meeting created: ', savedMeeting);
    } catch (error){
        console.error('Error creating meeting: ', error);
    }
};

createMeeting();