import { supabase } from '../config/supabase.js';
import { hashPassword, verifyPassword } from '../utils/hashPassword.js';

export const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .or(`email.eq.${email},username.eq.${username}`)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password using SHA-256
    const passwordHash = hashPassword(password);

    // Create new user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{ email, username, password_hash: passwordHash }])
      .select('id, email, username')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Failed to create user', details: error.message || error });
    }

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
      token: newUser.id
    });
  } catch (error) {
    console.error('Signup controller error:', error);
    res.status(500).json({ error: 'Server error', details: error.message || error });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, username, password_hash')
      .eq('email', email)
      .maybeSingle();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    if (!verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return user data and token (using user id as token)
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      },
      token: user.id
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
