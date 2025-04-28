import { connectDB } from '../../db/index';
import Meeting from '../../models/meeting';

const findMeeting = async () => {
    await connectDB();

    try {
        const meeting = await Meeting.findOne({ title: 'Team Sync' });

        if (!meeting) {
            console.log('No meeting found with the title "Team Sync"');
            return;  
        }

        console.log('Meeting found: ', {
            id: meeting.id,
            title: meeting.title,
            ownerName: meeting.ownerName,
            dateFrom: meeting.dateFrom,
            dateTo: meeting.dateTo,
            optionIds: meeting.optionIds,
        });

    } catch (error) {
        console.error('Error finding meeting: ', error.message || error);
    }
};

findMeeting();
