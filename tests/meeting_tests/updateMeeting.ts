import { connectDB, disconnectDB } from '../../db/index';
import Meeting from '../../models/meeting';

const updateMeeting = async () => {
    await connectDB();

    try {
        const updatedMeeting = await Meeting.findOneAndUpdate(
            { title: 'Team Sync' },  
            { title: 'Team Weakly Sync',
              ownerName: 'Olya At',
            },  
            { new: true } 
        );

        if (!updatedMeeting) {
            console.log('No meeting found to update.');
            return;  
        }

        console.log('Meeting updated: ', {
            id: updatedMeeting.id,
            title: updatedMeeting.title,
            ownerName: updatedMeeting.ownerName,
            dateFrom: updatedMeeting.dateFrom,
            dateTo: updatedMeeting.dateTo,
            optionIds: updatedMeeting.optionIds,
        });

    } catch (error) {
        console.error('Error updating meeting: ', error);
    }finally {
        await disconnectDB();
    }
};

updateMeeting();
