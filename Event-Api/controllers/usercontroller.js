import User from "../models/User";

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const exists = await User.findOne({ email });

    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email });
    await user.save();

    res.status(201).json({ message: 'User created successfully', userId: user._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
