const User = require('../models/User');

exports.postSeed = async (req, res) => {
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
    const user = new User({
      email: email,
      password: label,
      profile: {
        isAdmin: label.includes('admin'),
        isStudent: label.includes('student'),
        isTeacher: label.includes('teacher'),
      }
    });
    const existingUser = await User.findOne({email: email}).exec();
    if (existingUser) {
      console.warn(`User ${label} is already seeded in database`)
    }
    await user.save();
    return user;
  }));
  const students = testUser.filter(user => user.profile.isStudent);
  for (let i = 0; i < testUsers.length; i++) {
    const testUser = testUsers[i];
    if (testUser.email.includes('teacher')) {
      if (testUser.email.includes('1')) {
        // Add the odd students
        // Give them the odd students
        testUser.profile.students = students.filter(student => parseInt(student.email[7]) % 2 === 1).map(student => student._id)
      } else {
        testUser.profile.students = students.filter(student => parseInt(student.email[7]) % 2 === 0).map(student => student._id)
      }
      await testUser.save();
    }
  }
}
