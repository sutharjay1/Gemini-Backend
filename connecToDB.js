import mongoose from 'mongoose';

const connectToDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://sutharjay3635:QiJvGZOTc5zgVJMA@cluster0.qqgku2i.mongodb.net/',
      {}
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToDB;
