const LearningGoal = require('../models/learningGoal');

exports.getGoals = async (req, res) => {
    try {
        const userId = req.user.id;
        const goals = await LearningGoal.findByUserId(userId);
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching goals', error: error.message });
    }
};

exports.getGoal = async (req, res) => {
    try {
        const goalId = req.params.id;
        const goal = await LearningGoal.findById(goalId);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.json(goal);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching goal', error: error.message });
    }
};

exports.createGoal = async (req, res) => {
    try {
        const userId = req.user.id;
        const { goal, startDate, endDate, priority } = req.body;
        const newGoal = await LearningGoal.create({ userId, goal, startDate, endDate, priority });
        res.status(201).json({ message: 'Goal created successfully', goal: newGoal });
    } catch (error) {
        res.status(500).json({ message: 'Error creating goal', error: error.message });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const goalId = req.params.id;
        const { goal, startDate, endDate, priority } = req.body;
        const updatedGoal = await LearningGoal.update(goalId, { goal, startDate, endDate, priority });
        res.json({ message: 'Goal updated successfully', goal: updatedGoal });
    } catch (error) {
        res.status(500).json({ message: 'Error updating goal', error: error.message });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const goalId = req.params.id;
        await LearningGoal.delete(goalId);
        res.json({ message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting goal', error: error.message });
    }
};

exports.updateGoalPriorities = async (req, res) => {
    try {
        const goals = req.body.goals; // Expect an array of {id, priority} objects
        await LearningGoal.updatePriorities(goals);
        res.json({ message: 'Goal priorities updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating goal priorities', error: error.message });
    }
};