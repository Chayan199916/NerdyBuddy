const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   - name: Profile
 *     description: User profile management API
 */

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     description: Retrieve the profile information for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 age:
 *                   type: integer
 *                   example: 30
 *                 location:
 *                   type: string
 *                   example: "New York"
 *                 yearsOfExperience:
 *                   type: integer
 *                   example: 5
 *                 currentRole:
 *                   type: string
 *                   example: "Software Engineer"
 *                 totalAvailableHours:
 *                   type: integer
 *                   example: 40
 *                 timeFrame:
 *                   type: string
 *                   example: "Weekly"
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Error fetching profile
 */
router.get('/', authMiddleware, profileController.getProfile);
/**
 * @swagger
 * /api/profile:
 *   post:
 *     summary: Create user profile
 *     tags: [Profile]
 *     description: Create a new profile for the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               age:
 *                 type: integer
 *                 example: 30
 *               location:
 *                 type: string
 *                 example: "New York"
 *               yearsOfExperience:
 *                 type: integer
 *                 example: 5
 *               currentRole:
 *                 type: string
 *                 example: "Software Engineer"
 *               totalAvailableHours:
 *                 type: integer
 *                 example: 40
 *               timeFrame:
 *                 type: string
 *                 example: "Weekly"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile created successfully"
 *                 profile:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     age:
 *                       type: integer
 *                     location:
 *                       type: string
 *                     yearsOfExperience:
 *                       type: integer
 *                     currentRole:
 *                       type: string
 *                     totalAvailableHours:
 *                       type: integer
 *                     timeFrame:
 *                       type: string
 *       500:
 *         description: Error creating profile
 */
router.post('/', authMiddleware, profileController.createProfile);
/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     description: Update the profile information for the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               age:
 *                 type: integer
 *                 example: 31
 *               location:
 *                 type: string
 *                 example: "San Francisco"
 *               yearsOfExperience:
 *                 type: integer
 *                 example: 6
 *               currentRole:
 *                 type: string
 *                 example: "Senior Software Engineer"
 *               totalAvailableHours:
 *                 type: integer
 *                 example: 35
 *               timeFrame:
 *                 type: string
 *                 example: "Monthly"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 profile:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     age:
 *                       type: integer
 *                     location:
 *                       type: string
 *                     yearsOfExperience:
 *                       type: integer
 *                     currentRole:
 *                       type: string
 *                     totalAvailableHours:
 *                       type: integer
 *                     timeFrame:
 *                       type: string
 *       500:
 *         description: Error updating profile
 */
router.put('/', authMiddleware, profileController.updateProfile);
/**
 * @swagger
 * /api/profile:
 *   delete:
 *     summary: Delete user profile
 *     tags: [Profile]
 *     description: Delete the profile information for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile deleted successfully"
 *       500:
 *         description: Error deleting profile
 */
router.delete('/', authMiddleware, profileController.deleteProfile);

module.exports = router;