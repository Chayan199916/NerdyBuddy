const db = require('../../config/database');

class LearningGoal {
    static async findByUserId(userId) {
        const query = 'SELECT * FROM learning_goals WHERE user_id = $1 ORDER BY priority';
        const result = await db.query(query, [userId]);
        return result.rows;
    }

    static async findById(id) {
        const query = 'SELECT * FROM learning_goals WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    static async create(data) {
        const { userId, goal, startDate, endDate, priority } = data;
        const query = `
            INSERT INTO learning_goals (user_id, goal, start_date, end_date, priority)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [userId, goal, startDate, endDate, priority];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    static async update(id, data) {
        const { goal, startDate, endDate, priority } = data;
        const query = `
            UPDATE learning_goals 
            SET goal = $1, start_date = $2, end_date = $3, priority = $4
            WHERE id = $5 
            RETURNING *
        `;
        const values = [goal, startDate, endDate, priority, id];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM learning_goals WHERE id = $1 RETURNING *';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    static async updatePriorities(goals) {
        const client = await db.getClient();
        try {
            await client.query('BEGIN');
            for (const goal of goals) {
                await client.query(
                    'UPDATE learning_goals SET priority = $1 WHERE id = $2',
                    [goal.priority, goal.id]
                );
            }
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }
}

module.exports = LearningGoal;