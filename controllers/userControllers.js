const { createUserS, loginS } = require("../services/userServices");

const { comparePassword } = require("../helpers/bcrypt");

const { generateJWT } = require("../helpers/generateJWT");

const createUser = async (req, res) => {
  try {
    const user = await createUserS(req.body);
    const { _id, name, role } = user;
    const token = await generateJWT(_id, name, role);
    res.status(200).json({ ok: true, user, token });
  } catch (error) {
    res.status(404).json({ ok: false, msg: "there was an error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await loginS(email);

    if (!foundUser) {
      return res.status(404).json({ msg: "password/email problem email" });
    }
    const { password: dbPassword, _id, role, name } = foundUser;

    const match = await comparePassword(password, dbPassword);

    if (!match) {
      return res.status(404).json({ msg: "password/email problem pass" });
    }

    const token = await generateJWT(_id, name, role);

    return res.status(200).json({ ok: true, token, user: foundUser });
  } catch (error) {
    res.status(404).json({ ok: false, msg: "there was an error" });
  }
};

module.exports = {
  createUser,
  login,
};
