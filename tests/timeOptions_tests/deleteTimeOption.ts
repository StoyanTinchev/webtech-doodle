import { connectDB } from '../../db/index';
import TimeOption from '../../models/timeOption';

const deleteTimeOption = async () => {
    await connectDB();

    try {
        const option = await TimeOption.findOne({ hour: 16 }); 
        if (!option) {
            console.error('TimeOption not found!');
            return;
        }

        await TimeOption.deleteOne({ _id: option._id });
        console.log('TimeOption deleted successfully');
    } catch (error) {
        console.error('Error deleting TimeOption:', error);
    }
};

deleteTimeOption();
