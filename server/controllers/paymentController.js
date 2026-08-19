import razorpay from '../config/razorpay.js';
import crypto from 'crypto';
import User from '../models/User.js';

export const createOrder = async (req, res) => {
    try {

        const options = {
            amount: 100,
            currency: 'INR',
            receipt: `genblog_${Date.now()}`,
            notes: {
                userId: req.user.id
            }
        };

        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            order
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const expiryDate = new Date();

        expiryDate.setMonth(expiryDate.getMonth() + 1);

        user.isSubscribed = true;
        user.subscriptionExpiry = expiryDate;

        await user.save();

        res.json({
            success: true,
            message: 'Payment verified. AI access activated.',
            subscriptionExpiry: expiryDate
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};