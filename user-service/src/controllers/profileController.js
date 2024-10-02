const Profile = require('../models/profile');

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await Profile.findByUserId(userId);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
};

exports.createProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, age, location, yearsOfExperience, currentRole, totalAvailableHours, timeFrame } = req.body;
        const newProfile = await Profile.create(userId, { name, age, location, yearsOfExperience, currentRole, totalAvailableHours, timeFrame });
        res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error creating profile', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, age, location, yearsOfExperience, currentRole, totalAvailableHours, timeFrame } = req.body;
        const updatedProfile = await Profile.update(userId, { name, age, location, yearsOfExperience, currentRole, totalAvailableHours, timeFrame });
        res.json({ message: 'Profile updated successfully', profile: updatedProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        await Profile.delete(userId);
        res.json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting profile', error: error.message });
    }
};