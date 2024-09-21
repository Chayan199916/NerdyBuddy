-- Create application database
CREATE DATABASE nerdybuddy;

-- Create application user
CREATE USER appuser WITH ENCRYPTED PASSWORD 'apppassword';

-- Grant privileges to application user
GRANT ALL PRIVILEGES ON DATABASE nerdybuddy TO appuser;

-- Connect to the application database
\c nerdybuddy

-- Create tables
-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100),
    age INTEGER,
    location VARCHAR(100)
);

-- Learning Goals Table
CREATE TABLE IF NOT EXISTS learning_goals (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    primary_goal TEXT,
    areas_of_interest TEXT[],
    target_timeline DATE
);

-- Preferences Table
CREATE TABLE IF NOT EXISTS preferences (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    content_types TEXT[],
    learning_mode VARCHAR(50) NOT NULL,
    study_time INTEGER,
    skill_level VARCHAR(20)
);

-- Progress Table
CREATE TABLE IF NOT EXISTS progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    completed_module VARCHAR(100),
    quiz_score FLOAT,
    time_spent INTEGER,
    repetition_count INTEGER,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Feedback Table
CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content_id INTEGER,  -- Add foreign key reference to content table if available
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),  -- Assuming rating is from 1 to 5
    understanding INTEGER,
    difficulty INTEGER,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Step 4: Insert dummy records

-- Insert dummy users only if they don't already exist
INSERT INTO users (username, email, password)
SELECT 'john_doe', 'john@example.com', 'hashed_password_123'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'john_doe' AND email = 'john@example.com');

INSERT INTO users (username, email, password)
SELECT 'jane_smith', 'jane@example.com', 'hashed_password_456'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'jane_smith' AND email = 'jane@example.com');

-- Insert dummy user profiles
INSERT INTO user_profiles (user_id, name, age, location)
SELECT 1, 'John Doe', 28, 'New York'
WHERE NOT EXISTS (SELECT 1 FROM user_profiles WHERE user_id = 1);

INSERT INTO user_profiles (user_id, name, age, location)
SELECT 2, 'Jane Smith', 32, 'Los Angeles'
WHERE NOT EXISTS (SELECT 1 FROM user_profiles WHERE user_id = 2);

-- Insert dummy learning goals
INSERT INTO learning_goals (user_id, primary_goal, areas_of_interest, target_timeline)
SELECT 1, 'Learn Python for Data Science', ARRAY['Python', 'Data Analysis'], '2024-12-31'
WHERE NOT EXISTS (SELECT 1 FROM learning_goals WHERE user_id = 1);

INSERT INTO learning_goals (user_id, primary_goal, areas_of_interest, target_timeline)
SELECT 2, 'Master Frontend Development', ARRAY['React', 'CSS'], '2024-10-01'
WHERE NOT EXISTS (SELECT 1 FROM learning_goals WHERE user_id = 2);

-- Insert dummy preferences
INSERT INTO preferences (user_id, content_types, learning_mode, study_time, skill_level)
SELECT 1, ARRAY['Video', 'Quiz'], 'Self-Paced', 60, 'Beginner'
WHERE NOT EXISTS (SELECT 1 FROM preferences WHERE user_id = 1);

INSERT INTO preferences (user_id, content_types, learning_mode, study_time, skill_level)
SELECT 2, ARRAY['Article', 'Project'], 'Instructor-Led', 120, 'Intermediate'
WHERE NOT EXISTS (SELECT 1 FROM preferences WHERE user_id = 2);

-- Insert dummy progress
INSERT INTO progress (user_id, completed_module, quiz_score, time_spent, repetition_count)
SELECT 1, 'Python Basics', 85.5, 120, 2
WHERE NOT EXISTS (SELECT 1 FROM progress WHERE user_id = 1 AND completed_module = 'Python Basics');

INSERT INTO progress (user_id, completed_module, quiz_score, time_spent, repetition_count)
SELECT 2, 'React Components', 92.0, 90, 1
WHERE NOT EXISTS (SELECT 1 FROM progress WHERE user_id = 2 AND completed_module = 'React Components');

-- Insert dummy feedback
INSERT INTO feedback (user_id, content_id, rating, understanding, difficulty)
SELECT 1, 101, 4, 5, 3
WHERE NOT EXISTS (SELECT 1 FROM feedback WHERE user_id = 1 AND content_id = 101);

INSERT INTO feedback (user_id, content_id, rating, understanding, difficulty)
SELECT 2, 102, 5, 4, 2
WHERE NOT EXISTS (SELECT 1 FROM feedback WHERE user_id = 2 AND content_id = 102);


-- Grant privileges on tables to application user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO appuser;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO appuser;