import { Router, Request, Response } from 'express';
import admin from 'firebase-admin';
import db from '../models/user'; 

const router = Router();

// Registration Route
router.post('/register', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userRecord = await admin.auth().createUser({ email, password });
        const userId = userRecord.uid;

        // Save user details to MySQL
        db.query('INSERT INTO users (id, email) VALUES (?, ?)', [userId, email], (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).send({ uid: userId, email });
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login Route
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        
        // Here you can validate the password if necessary
        res.status(200).send({ uid: userRecord.uid, email });
    } catch (error) {
        res.status(404).send(error);
    }
});

// Export the router
export default router;
