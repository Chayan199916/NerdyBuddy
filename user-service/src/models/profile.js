const db = require('../../config/database');

class Profile {
    static async findByUserId(userId) {
        const query = 'SELECT * FROM user_profiles WHERE user_id = $1';
        const result = await db.query(query, [userId]);
        return result.rows[0];
    }

    static async create(userId, data) {
        const { name, age, location, yearsOfExperience, currentRole, totalAvailableHours, timeFrame } = data;
        const query = `
            INSERT INTO user_profiles (user_id, name, age, location, years_of_experience, "current_role", total_available_hours, time_frame)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const values = [userId, name, age, location, yearsOfExperience, currentRole, totalAvailableHours, timeFrame];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    static async update(userId, data) {
        const { name, age, location, yearsOfExperience, currentRole, totalAvailableHours, timeFrame } = data;
        const query = `
            UPDATE user_profiles 
            SET name = $1, age = $2, location = $3, years_of_experience = $4, current_role = $5, total_available_hours = $6, time_frame = $7 
            WHERE user_id = $8 
            RETURNING *
        `;
        const values = [name, age, location, yearsOfExperience, currentRole, totalAvailableHours, timeFrame, userId];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    static async delete(userId) {
        const query = 'DELETE FROM user_profiles WHERE user_id = $1 RETURNING *';
        const result = await db.query(query, [userId]);
        return result.rows[0];
    }
}

module.exports = Profile;