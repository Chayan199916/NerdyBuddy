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

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, age, location } = req.body;
        const updatedProfile = await Profile.update(userId, { name, age, location });
        res.json({ message: 'Profile updated successfully', profile: updatedProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};