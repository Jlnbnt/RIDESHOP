const User = require("../../models/User");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res) => {
  const { name, lastname, username, email, password } = req.body;
  if (!name || !lastname || !username || !email || !password)
    return res.status(400).json({ message: "Informations are missing" });

  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate) return res.sendStatus(409);

  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const result = await User.create({
      name: name,
      lastname: lastname,
      username: username,
      email: email,
      password: hashedPwd,
    });
    res.status(201).json({ success: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleRegister };
