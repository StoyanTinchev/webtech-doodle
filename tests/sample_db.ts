import { connectDB } from '../db/index';
import Meeting from '../models/meeting';
import TimeOption from '../models/timeOption';
import User from '../models/user';
import Vote from '../models/vote';

const seedDatabase = async () => {
  await connectDB();

  try {
    const meeting = new Meeting({
      title: 'Project Kickoff',
      ownerName: 'Ivan Petrov',
      dateFrom: '2025-06-01T00:00:00Z',
      dateTo: '2025-06-05T00:00:00Z',
      optionIds: [],
    });

    const savedMeeting = await meeting.save();
    console.log('Meeting created:', savedMeeting.id);

    const timeOption1 = new TimeOption({
      meetingId: savedMeeting.id,
      date: '2025-06-02',
      hour: 10,
    });

    const timeOption2 = new TimeOption({
      meetingId: savedMeeting.id,
      date: '2025-06-03',
      hour: 14,
    });

    const savedTimeOption1 = await timeOption1.save();
    const savedTimeOption2 = await timeOption2.save();
    console.log('TimeOptions created:', savedTimeOption1.id, savedTimeOption2.id);

    savedMeeting.optionIds.push(savedTimeOption1.id, savedTimeOption2.id);
    await savedMeeting.save();
    console.log('Meeting updated with options.');

    const user = new User({
      name: 'Ivan Petrov',
      email: 'ivan@example.com',
      passwordHash: 'supersecurepassword',
    });

    const savedUser = await user.save();
    console.log('User created:', savedUser.id);

    const vote = new Vote({
      meetingId: savedMeeting.id,
      optionId: savedTimeOption1.id,
      userName: savedUser.name,
    });

    const savedVote = await vote.save();
    console.log('Vote created:', savedVote.id);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
