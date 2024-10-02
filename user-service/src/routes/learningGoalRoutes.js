const express = require('express');
const router = express.Router();
const learningGoalController = require('../controllers/learningGoalController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   - name: Learning Goals
 *     description: User learning goals management API
 */

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Get all learning goals
 *     tags: [Learning Goals]
 *     description: Retrieve all learning goals for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of learning goals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   goal:
 *                     type: string
 *                     example: "Learn Node.js"
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-01"
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-06-01"
 *                   priority:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Error fetching goals
 */
router.get('/', authMiddleware, learningGoalController.getGoals);
/**
 * @swagger
 * /api/goals/{id}:
 *   get:
 *     summary: Get a learning goal by ID
 *     tags: [Learning Goals]
 *     description: Retrieve a specific learning goal by its ID for the authenticated user.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the learning goal
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Learning goal data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 goal:
 *                   type: string
 *                   example: "Learn Node.js"
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-01-01"
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-06-01"
 *                 priority:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Goal not found
 *       500:
 *         description: Error fetching goal
 */
router.get('/:id', authMiddleware, learningGoalController.getGoal);
/**
 * @swagger
 * /api/goals:
 *   post:
 *     summary: Create a new learning goal
 *     tags: [Learning Goals]
 *     description: Create a learning goal for the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goal:
 *                 type: string
 *                 example: "Learn Node.js"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-01"
 *               priority:
 *                 type: integer
 *                 example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Goal created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Goal created successfully"
 *                 goal:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     goal:
 *                       type: string
 *                       example: "Learn Node.js"
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: "2024-01-01"
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: "2024-06-01"
 *                     priority:
 *                       type: integer
 *                       example: 1
 *       500:
 *         description: Error creating goal
 */
router.post('/', authMiddleware, learningGoalController.createGoal);
/**
 * @swagger
 * /api/goals/{id}:
 *   put:
 *     summary: Update a learning goal
 *     tags: [Learning Goals]
 *     description: Update a specific learning goal for the authenticated user.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the learning goal
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goal:
 *                 type: string
 *                 example: "Learn Node.js"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-01"
 *               priority:
 *                 type: integer
 *                 example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Goal updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Goal updated successfully"
 *                 goal:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     goal:
 *                       type: string
 *                       example: "Learn Node.js"
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: "2024-01-01"
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: "2024-06-01"
 *                     priority:
 *                       type: integer
 *                       example: 1
 *       500:
 *         description: Error updating goal
 */
router.put('/:id', authMiddleware, learningGoalController.updateGoal);
/**
 * @swagger
 * /api/goals/{id}:
 *   delete:
 *     summary: Delete a learning goal
 *     tags: [Learning Goals]
 *     description: Delete a specific learning goal by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the learning goal
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Goal deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Goal deleted successfully"
 *       500:
 *         description: Error deleting goal
 */
router.delete('/:id', authMiddleware, learningGoalController.deleteGoal);
/**
 * @swagger
 * /api/goals/priorities:
 *   put:
 *     summary: Update learning goal priorities
 *     tags: [Learning Goals]
 *     description: Update the priorities of multiple learning goals for the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goals:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     priority:
 *                       type: integer
 *                       example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Goal priorities updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Goal priorities updated successfully"
 *       500:
 *         description: Error updating goal priorities
 */
router.put('/priorities', authMiddleware, learningGoalController.updateGoalPriorities);

module.exports = router;