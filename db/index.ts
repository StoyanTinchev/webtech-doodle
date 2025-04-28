import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const mongoUri = 'mongodb+srv://team11:team11pass@doodle-db.rtfuxs4.mongodb.net/doodle-db?retryWrites=true&w=majority&appName=doodle-db';


export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

//connectDB();