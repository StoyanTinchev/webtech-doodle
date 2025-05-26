import mongoose from 'mongoose';

mongoose.set('strictQuery', false);


export const connectDB = async (mongoUri: string | undefined) => {
  try {
    if (!mongoUri) {
        console.error('MongoDB URI is not defined. Please set the MONGO_URI environment variable.');
        process.exit(1);
    }
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
  }
};

