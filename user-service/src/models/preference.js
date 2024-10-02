const db = require('../../config/database');

class Preference {
    static async findByUserId(userId) {
        const query = 'SELECT * FROM preferences WHERE user_id = $1';
        const result = await db.query(query, [userId]);
        return result.rows[0];
    }

    static async create(userId, data) {
        const { contentTypes, learningMode, skillLevel } = data;
        const query = `
            INSERT INTO preferences (user_id, content_types, learning_mode, skill_level)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [userId, contentTypes, learningMode, skillLevel];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    static async update(userId, data) {
        const { contentTypes, learningMode, skillLevel } = data;
        const query = `
            UPDATE preferences 
            SET content_types = $1, learning_mode = $2, skill_level = $3
            WHERE user_id = $4 
            RETURNING *
        `;
        const values = [contentTypes, learningMode, skillLevel, userId];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    static async delete(userId) {
        const query = 'DELETE FROM preferences WHERE user_id = $1 RETURNING *';
        const result = await db.query(query, [userId]);
        return result.rows[0];
    }
}

module.exports = Preference;