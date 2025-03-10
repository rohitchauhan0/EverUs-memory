const Auth = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');

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


const LOGIN = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        // Validate password
       

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        // Set HTTP-Only Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure in production
            sameSite: 'Strict', // Prevent CSRF
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({ message: 'Login successful', success: true, token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    SIGN_IN,
    LOGIN
}