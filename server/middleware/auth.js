import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    // const token = req.cookies.token;

    const token = req.headers.authorization;
    console.log("Authorization:", req.headers.authorization);
    if (!token) {
        return res.json({
            success: false,
            message: 'Not authenticated'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch (error) {
        res.json({
            success: false,
            message: 'Invalid token'
        });
    }
}

export default auth;