import { prisma } from '../database/prisma.js';
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }

    const accessToken = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET;
    
    jwt.verify(accessToken, secretKey, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' });
        }

        const userId = decoded.sub;
        
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (user) {
            delete user.password;
        }

        console.log('Authenticated User:', user);
        
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        req.user = user;

        next();
    });
};

export default authMiddleware;