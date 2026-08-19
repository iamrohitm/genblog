import User from '../models/User.js';

export const aiAccess = async (req, res, next) => {
    try {
        // Admin gets AI access for free
        if (req.user.role === 'admin') {
            return next();
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check both subscription status and expiry
        if (
            user.isSubscribed &&
            user.subscriptionExpiry &&
            user.subscriptionExpiry > new Date()
        ) {
            return next();
        }

        return res.status(403).json({
            success: false,
            message: 'AI access requires an active subscription'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};