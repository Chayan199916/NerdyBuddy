const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profileRoutes');
const learningGoalRoutes = require('./routes/learningGoalRoutes');
const preferenceRoutes = require('./routes/preferenceRoutes');
const errorHandler = require('./middleware/errorHandler');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swaggerConfig'); // Import the Swagger config

const app = express();

// Serve Swagger documentation at /api-docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/goals', learningGoalRoutes);
app.use('/api/preferences', preferenceRoutes);

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;