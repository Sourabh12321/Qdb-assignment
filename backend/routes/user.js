const express = require("express");
const { User } = require("../models/userModel")
const jwt = require("jsonwebtoken");
const {auth} = require("../middleware/auth")
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();




const userRouter = express.Router();

userRouter.post("/insert", async (req, res) => {
    try {
        let { name, email, password, image } = req.body;
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ "msg": "User with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            id:uuidv4(),
            name,
            email,
            password: hashedPassword,
            image,
            lastLogin:new Date(),
        });

        res.status(200).json({ "msg": "User registered successfully." });
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        console.log(user);
        await user.update({"lastLogin":new Date()});

        if (!user) {
            return res.status(401).json({ "msg": "Invalid email or password." });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ "msg": "Invalid email or password." });
        }
        const token = jwt.sign({ userId: user.id }, process.env.KEY, { expiresIn: '1h' });

        res.status(200).json({ "msg": "Login successful.", "token": token });
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }
});



userRouter.get('/image/:id',auth, async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findOne({where:{id:userId}});

        if (!user) {
            return res.status(404).json({ "msg": "User not found." });
        }

        const userImage = user.image;

        if (!userImage) {
            return res.status(404).json({ "msg": "User has no image." });
        }
        res.status(200).json({ "msg": userImage }); 
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }
});


userRouter.put('/update/:id', auth, async (req, res) => {
    try {
        const userId = req.params.id;

        const userToUpdate = await User.findOne({ where: { id: userId } });

        if (!userToUpdate) {
            return res.status(404).json({ "msg": "User not found." });
        }

        const { name, email, password } = req.body;

        // Create an object to store the fields that should be updated
        const updates = {};

        if (name) {
            updates.name = name;
        }

        if (email && email !== userToUpdate.email) {
            const existingUser = await User.findOne({ where: { email } });

            if (existingUser) {
                return res.status(400).json({ "msg": "Email is already in use by another user." });
            }

            updates.email = email;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.password = hashedPassword;
        }

        updates.lastLogin = new Date();

        await userToUpdate.update(updates);

        res.status(200).json({ "msg": "User updated successfully." });
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }
});



userRouter.get("/details/:id?",auth, async (req, res) => {
    try {
        const userId = req.params.id;

        if (userId) {
            const user = User.findOne({ where: { id: userId } });

            if (!user) {
                return res.status(404).json({ "msg": "User not found." });
            }

            res.status(200).json({ "msg": user });
        } else {
            const users = await User.findAll();

            res.status(200).json({ "msg": users });
        }
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }
});


userRouter.delete('/delete/:id',auth, async (req, res) => {
    try {
        const userId = req.params.id;

        const userToDelete = await User.findOne({ where: { id: userId } });

        if (!userToDelete) {
            return res.status(404).json({ "msg": "User not found." });
        }

        await userToDelete.destroy();

        res.status(200).json({ "msg": "User deleted successfully." });
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }
});


module.exports = {
    userRouter
}