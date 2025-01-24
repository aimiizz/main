import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../models/user';

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Perform login logic (e.g., check against a database)

  return res.status(200).json({ message: 'Login successful' });
};


// export const login = async (req: Request, res: Response): Promise<Response> => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }

//   try {
//     db.execute('SELECT * FROM users WHERE username = ?', [username], (err: any, results: any) => {
//       if (err) {
//         return res.status(500).json({ message: 'Database error', error: err });
//       }

//       if (results.length === 0) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       const user = results[0];

//       bcrypt.compare(password, user.password, (err, isMatch) => {
//         if (err) {
//           return res.status(500).json({ message: 'Error comparing passwords', error: err });
//         }

//         if (!isMatch) {
//           return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         return res.status(200).json({ message: 'Login successful', user });
//       });
//     });
//   } catch (err) {
//     return res.status(500).json({ message: 'Internal server error', error: err });
//   }

//     throw new Error("Logic error: This code should never be reached.");

// };
