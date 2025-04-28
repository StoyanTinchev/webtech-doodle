import { connectDB } from '../../db/index';
import TimeOption from '../../models/timeOption';

const updateTimeOption = async () => {
    await connectDB();

    try {
        const option = await TimeOption.findOne({ hour: 14 }); 
        if (!option) {
            console.error('TimeOption not found!');
            return;
        }

        option.hour = 16; 
        const updatedOption = await option.save();

        console.log('TimeOption updated:', updatedOption);
    } catch (error) {
        console.error('Error updating TimeOption:', error);
    }
};

updateTimeOption();
