const db = require('../../config/database');

class User {
    static async create(username, email, password, mob) {
        const query = 'INSERT INTO users (username, email, password, mobile_number) VALUES ($1, $2, $3, $4) RETURNING id';
        const values = [username, email, password, mob];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1;';
        const result = await db.query(query, [email]);
        return result.rows[0];
    }
}

module.exports = User;