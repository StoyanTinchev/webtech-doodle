import { connectDB, disconnectDB } from '../../db/index';
import Meeting from '../../models/meeting';

const createMeeting = async () => {
    await connectDB();

    const newMeeting = new Meeting({
        title: 'Team Sync',
        ownerName: 'Olya Atanasova',
        dateFrom: '2025-05-01T00:00:00Z',  
        dateTo: '2025-05-05T00:00:00Z',    
        optionIds: [],
    });

    try {
        if (!newMeeting.title || !newMeeting.ownerName || !newMeeting.dateFrom || !newMeeting.dateTo) {
            throw new Error('Missing required fields');
        }

        const existingMeeting = await Meeting.findOne({ title: newMeeting.title });
        if (existingMeeting) {
            throw new Error('Meeting with this title already exists');
        }

        const savedMeeting = await newMeeting.save();
        console.log('Meeting created: ', savedMeeting);

    } catch (error) {
        console.error('Error creating meeting: ', error);
    }finally {
        await disconnectDB();
    }
};

createMeeting();
