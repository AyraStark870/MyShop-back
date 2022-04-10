const User = require("../models/users");
const { hashPassword } = require("../helpers/bcrypt");

const createUserS = async (body) => {
  const { fullName, email, password, role } = body;

  const user = await new User({
    fullName,
    email,
    password,
    role,
  });
  user.password = await hashPassword(password);
  await user.save();
  return user;
};

const loginS = async (email) => {
  const foundUser = await User.findOne({ email });
  return foundUser;
};

module.exports = {
  createUserS,
  loginS,
};
