const User = require('../models/User');
const mongoose = require('mongoose');

exports.postSeed = async (req, res) => {
  mongoose.set('debug', true)
  const testUsers = await Promise.all([
    ['admin1'],
    ['admin2'],
    ['teacher1'],
    ['teacher2'],
    ['student1'],
    ['student2'],
    ['student4'],
    ['student5'],
  ].map(async ([label]) => {
    const email = `${label}@${label}.com`;
    const existingUser = await User.findOne({email: email}).exec();
    const user = new User({
      email: email,
      password: label,
      profile: {
        isAdmin: label.includes('admin'),
        isStudent: label.includes('student'),
        isTeacher: label.includes('teacher'),
      }
    });
    if (existingUser) {
      return existingUser;
      console.warn(`User ${label} is already seeded in database`)
    }
    await user.save();
    return user;
  }));
  const students = testUsers.filter(user => user.profile.isStudent);
  for (let i = 0; i < testUsers.length; i++) {
    const testUser = testUsers[i];
    if (testUser.email.includes('teacher')) {
      if (testUser.email.includes('1')) {
        // Add the odd students
        // Give them the odd students
        let students1 = students.filter(student => {
          const number = parseInt(student.email[7]);
          return number % 2 === 1;
        }).map(student => student._id.toString());
        await testUser.set({
          'profile.students': students1
        })
        await testUser.save();
      } else {
        let students2 = students.filter(student => {
          const number = parseInt(student.email[7]);
          return number % 2 === 0;
        }).map(student => student._id.toString());
        await testUser.set({
          'profile.students': students2
        })
        await testUser.save();
      }
    }
  }
  res.status(200);
  res.json({message: "Seeding complete!"})
}
