-CREATE TABLE users (
    user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    last_login TIMESTAMP,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('admin', 'teacher', 'student'))
);

--  Admin Table
CREATE TABLE admins (
    admin_id SERIAL UNIQUE PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    department VARCHAR(100)  ,
    CONSTRAINT admin_user UNIQUE(user_id)
);

-- Teacher Table
CREATE TABLE teachers (
    teacher_id SERIAL UNIQUE PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    employment_status VARCHAR(50),
    contract_type VARCHAR(50),
    CONSTRAINT teacher_user UNIQUE(user_id)
);

--Student Table
CREATE TABLE IF NOT EXISTS students (
    user_id SERIAL UNIQUE PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    roll_no VARCHAR(50) UNIQUE NOT NULL,
    course VARCHAR(100) NOT NULL,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--course table
CREATE TABLE courses (
    course_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    teacher_id UUID NOT NULL,
    start_date DATE, 
    end_date DATE,
    max_students INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES users(user_id) ON DELETE CASCADE
);


