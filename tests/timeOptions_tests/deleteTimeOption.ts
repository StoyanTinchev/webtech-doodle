import { connectDB, disconnectDB } from '../../db/index';
import TimeOption from '../../models/timeOption';

const deleteTimeOption = async () => {
    await connectDB();

    try {
        const option = await TimeOption.findOne({ hour: 18 });
        if (!option) {
            console.log('No TimeOption found with this hour.');
            return;
        }

        const result = await TimeOption.deleteOne({ _id: option._id });

        if (result.deletedCount > 0) {
            console.log('TimeOption deleted successfully.');
        } else {
            console.log('TimeOption not deleted.');
        }
    } catch (error) {
        console.error('Error deleting TimeOption:', error);
    } finally{
        await disconnectDB();
    }
};

deleteTimeOption();
