import { connectDB } from '../../db/index';
import TimeOption from '../../models/timeOption';

const updateTimeOption = async () => {
    await connectDB();

    try {
        const option = await TimeOption.findOne({ hour: 14 });

        if (!option) {
            console.log('No TimeOption found with hour 14.');
            return;
        }

        option.hour = 16;

        const updatedOption = await option.save();
        console.log('TimeOption updated successfully:', updatedOption);
    } catch (error) {
        console.error('Error updating TimeOption:', error);
    }
};

updateTimeOption();
