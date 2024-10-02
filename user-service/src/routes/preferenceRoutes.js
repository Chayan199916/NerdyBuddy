const express = require('express');
const router = express.Router();
const preferenceController = require('../controllers/preferenceController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   - name: Preferences
 *     description: User preferences management API
 */

/**
 * @swagger
 * /api/preferences:
 *   get:
 *     summary: Get user preferences
 *     tags: [Preferences]
 *     description: Retrieve the preferences for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User preferences
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contentTypes:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Video"
 *                 learningMode:
 *                   type: string
 *                   example: "Self-paced"
 *                 skillLevel:
 *                   type: string
 *                   example: "Intermediate"
 *       404:
 *         description: Preferences not found
 *       500:
 *         description: Error fetching preferences
 */
router.get('/', authMiddleware, preferenceController.getPreference);
/**
 * @swagger
 * /api/preferences:
 *   post:
 *     summary: Create user preferences
 *     tags: [Preferences]
 *     description: Create new preferences for the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contentTypes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Video", "Article"]
 *               learningMode:
 *                 type: string
 *                 example: "Self-paced"
 *               skillLevel:
 *                 type: string
 *                 example: "Beginner"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Preferences created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Preferences created successfully"
 *                 preference:
 *                   type: object
 *                   properties:
 *                     contentTypes:
 *                       type: array
 *                       items:
 *                         type: string
 *                     learningMode:
 *                       type: string
 *                     skillLevel:
 *                       type: string
 *       500:
 *         description: Error creating preferences
 */
router.post('/', authMiddleware, preferenceController.createPreference);
/**
 * @swagger
 * /api/preferences:
 *   put:
 *     summary: Update user preferences
 *     tags: [Preferences]
 *     description: Update existing preferences for the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contentTypes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Video", "Article"]
 *               learningMode:
 *                 type: string
 *                 example: "Instructor-led"
 *               skillLevel:
 *                 type: string
 *                 example: "Advanced"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Preferences updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Preferences updated successfully"
 *                 preference:
 *                   type: object
 *                   properties:
 *                     contentTypes:
 *                       type: array
 *                       items:
 *                         type: string
 *                     learningMode:
 *                       type: string
 *                     skillLevel:
 *                       type: string
 *       500:
 *         description: Error updating preferences
 */
router.put('/', authMiddleware, preferenceController.updatePreference);
/**
 * @swagger
 * /api/preferences:
 *   delete:
 *     summary: Delete user preferences
 *     tags: [Preferences]
 *     description: Delete the preferences for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Preferences deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Preferences deleted successfully"
 *       500:
 *         description: Error deleting preferences
 */
router.delete('/', authMiddleware, preferenceController.deletePreference);

module.exports = router;