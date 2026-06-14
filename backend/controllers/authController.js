const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // sign JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // send token as httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // sign JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => { 
  const { name, email } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing && existing.id !== req.user.id) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, email },
      select: { id: true, name: true, email: true, createdAt: true },
    });
    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePassword = async (req, res) => { 
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if(!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashed },
    });
    res.status(200).json({ message: 'Password updated successfully' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAccount = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.user.id } });
    res.clearCookie('token');
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
}

const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out' });
};

module.exports = { register, login, updateProfile, updatePassword, deleteAccount, logout };
