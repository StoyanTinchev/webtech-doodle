import { connectDB, disconnectDB } from '../../db/index';
import TimeOption from '../../models/timeOption';

const updateTimeOption = async () => {
    await connectDB();

    try {
        const option = await TimeOption.findOne({ hour: 14 });

        if (!option) {
            console.log('No TimeOption found.');
            return;
        }

        option.hour = 18;

        const updatedOption = await option.save();
        console.log('TimeOption updated successfully:', updatedOption);
    } catch (error) {
        console.error('Error updating TimeOption:', error);
    }finally {
        await disconnectDB();
    }
};

updateTimeOption();
