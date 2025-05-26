import { connectDB, disconnectDB } from '../../db/index';
import Meeting from '../../models/meeting';

const deleteMeeting = async () => {
    await connectDB();

    try {
        const deletedMeeting = await Meeting.findOneAndDelete({ title: 'Team Weakly Sync' });

        if (!deletedMeeting) {
            console.log('No meeting found with this title to delete');
            return;  
        }

        console.log('Meeting deleted: ', {
            id: deletedMeeting.id,
            title: deletedMeeting.title,
            ownerName: deletedMeeting.ownerName,
            dateFrom: deletedMeeting.dateFrom,
            dateTo: deletedMeeting.dateTo,
            optionIds: deletedMeeting.optionIds,
        });

    } catch (error) {
        console.error('Error deleting meeting: ', error);
    } finally {
        await disconnectDB();
    }
};

deleteMeeting();
