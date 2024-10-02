const Preference = require('../models/preference');

exports.getPreference = async (req, res) => {
    try {
        const userId = req.user.id;
        const preference = await Preference.findByUserId(userId);
        if (!preference) {
            return res.status(404).json({ message: 'Preferences not found' });
        }
        res.json(preference);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching preferences', error: error.message });
    }
};

exports.createPreference = async (req, res) => {
    try {
        const userId = req.user.id;
        const { contentTypes, learningMode, skillLevel } = req.body;
        const newPreference = await Preference.create(userId, { contentTypes, learningMode, skillLevel });
        res.status(201).json({ message: 'Preferences created successfully', preference: newPreference });
    } catch (error) {
        res.status(500).json({ message: 'Error creating preferences', error: error.message });
    }
};

exports.updatePreference = async (req, res) => {
    try {
        const userId = req.user.id;
        const { contentTypes, learningMode, skillLevel } = req.body;
        const updatedPreference = await Preference.update(userId, { contentTypes, learningMode, skillLevel });
        res.json({ message: 'Preferences updated successfully', preference: updatedPreference });
    } catch (error) {
        res.status(500).json({ message: 'Error updating preferences', error: error.message });
    }
};

exports.deletePreference = async (req, res) => {
    try {
        const userId = req.user.id;
        await Preference.delete(userId);
        res.json({ message: 'Preferences deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting preferences', error: error.message });
    }
};