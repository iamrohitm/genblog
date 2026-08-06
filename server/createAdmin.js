import 'dotenv/config';
import bcrypt from 'bcrypt';
import connectDb from './config/db.js';
import User from './models/User.js';

const createAdmin = async () => {
    try {
        await connectDb();

        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!email || !password) {
            throw new Error('ADMIN_EMAIL or ADMIN_PASSWORD is missing in .env');
        }

        const existingAdmin = await User.findOne({ email });

        if (existingAdmin) {
            console.log('Admin already exists');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name: 'Admin',
            email,
            password: hashedPassword,
            role: 'admin'
        });

        console.log('Admin created successfully');
        process.exit(0);

    } catch (error) {
        console.error('Failed to create admin:', error);
        process.exit(1);
    }
};

createAdmin();