const db = require('../../config/database');

class Profile {
    static async findByUserId(userId) {
        const query = 'SELECT * FROM user_profiles WHERE user_id = $1';
        const result = await db.query(query, [userId]);
        return result.rows[0];
    }

    static async update(userId, data) {
        const { name, age, location } = data;
        const query = 'UPDATE user_profiles SET name = $1, age = $2, location = $3 WHERE user_id = $4 RETURNING *';
        const values = [name, age, location, userId];
        const result = await db.query(query, values);
        return result.rows[0];
    }
}

module.exports = Profile;