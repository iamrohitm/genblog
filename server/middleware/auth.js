import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        res.json({success: false, message: 'Invalid token'})
    }
}

export default auth;