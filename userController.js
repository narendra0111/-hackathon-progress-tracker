const User = require('../models/User');

// Fetch all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('projects');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Add a new user
const addUser = async (req, res) => {
    const { name, email, role } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, role });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Assign a project to a user
const assignProject = async (req, res) => {
    const { userId, projectId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.projects.push(projectId);
        await user.save();

        res.status(200).json({ message: 'Project assigned to user', user });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning project', error });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

module.exports = {
    getUsers,
    addUser,
    assignProject,
    deleteUser,
};
