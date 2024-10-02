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
    mobile_number VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    age SMALLINT CHECK (age >= 0),
    location VARCHAR(100),
    years_of_experience CHAR(6),
    "current_role" VARCHAR(100),
    total_available_hours DECIMAL(5,2) CHECK (total_available_hours >= 0),
    time_frame CHAR(6) NOT NULL CHECK (time_frame IN ('daily', 'weekly'))
);

-- Learning Goals Table
CREATE TABLE IF NOT EXISTS learning_goals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    goal TEXT,
    start_date DATE,
    end_date DATE,
    priority INTEGER,
    CONSTRAINT check_dates CHECK (start_date <= end_date)
);

-- Preferences Table
CREATE TABLE IF NOT EXISTS preferences (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    content_types TEXT[],
    learning_mode VARCHAR(50) NOT NULL,
    skill_level VARCHAR(20)
);

-- Progress Table
CREATE TABLE IF NOT EXISTS progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    goal_id INTEGER REFERENCES learning_goals(id) ON DELETE CASCADE,
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
    content_id INTEGER,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    understanding INTEGER,
    difficulty INTEGER,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Step 4: Insert dummy records

-- Insert dummy users
INSERT INTO users (username, email, password, mobile_number)
VALUES 
('john_doe', 'john@example.com', 'hashed_password_123', '+1234567890'),
('jane_smith', 'jane@example.com', 'hashed_password_456', '+9876543210');

-- Insert dummy user profiles
INSERT INTO user_profiles (user_id, name, age, location, years_of_experience, "current_role", total_available_hours, time_frame)
VALUES 
(1, 'John Doe', 28, 'New York', 5, 'Software Developer', 25, 'weekly'),
(2, 'Jane Smith', 32, 'Los Angeles', 8, 'Data Scientist', 5, 'daily');

-- Insert dummy learning goals
INSERT INTO learning_goals (user_id, goal, start_date, end_date, priority)
VALUES 
(1, 'Learn Python for Data Science', '2024-01-01', '2024-12-31', 1),
(1, 'Master SQL Databases', '2024-02-01', '2024-08-31', 2),
(2, 'Master Frontend Development', '2024-03-01', '2024-10-01', 1),
(2, 'Learn Machine Learning Algorithms', '2024-04-01', '2024-12-31', 2);

-- Insert dummy preferences
INSERT INTO preferences (user_id, content_types, learning_mode, skill_level)
VALUES 
(1, ARRAY['Video', 'Quiz'], 'Self-Paced', 'Beginner'),
(2, ARRAY['Article', 'Project'], 'Instructor-Led', 'Intermediate');

-- Insert dummy progress
INSERT INTO progress (user_id, goal_id, completed_module, quiz_score, time_spent, repetition_count)
VALUES 
(1, 1, 'Python Basics', 85.5, 120, 2),
(2, 3, 'React Components', 92.0, 90, 1);

-- Insert dummy feedback
INSERT INTO feedback (user_id, content_id, rating, understanding, difficulty)
VALUES 
(1, 101, 4, 5, 3),
(2, 102, 5, 4, 2);

-- Grant privileges on tables to application user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO appuser;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO appuser;