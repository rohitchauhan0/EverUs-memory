const Auth = require('../models/auth');

 const SIGN_IN = async (req, res, next) => {
    try {
    
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required', success: false });
            return;
        }

        const user = await Auth.findOne({ email });
        if (user) {
            res.status(404).json({ message: 'User already present', success: false });
            return;
        }

        const newUser = new Auth({ email, password });
        await newUser.save();

        res.status(200).json({ message: 'Sign-in successful', success: true });

    } catch (error) {
        next(error); // Pass error to Express error handler
    }
};


module.exports = {
    SIGN_IN
}