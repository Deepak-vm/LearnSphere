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
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    registration_number VARCHAR(50) UNIQUE,
    batch_year INTEGER,
    current_semester INTEGER,
    admission_date DATE,
    program_type VARCHAR(50),
    cgpa DECIMAL(4,2),
    credits_completed INTEGER,
    CONSTRAINT student_user UNIQUE(user_id)
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
 
--   Course Enrollments Table (Tracks student enrollments)
CREATE TABLE course_enrollments (
    enrollment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    student_id INTEGER NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'completed', 'dropped')),
    grade DECIMAL(5,2),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(course_id, student_id)
);


-- Course Prerequisites
CREATE TABLE course_prerequisites (
    course_id INTEGER REFERENCES courses(course_id),
    prerequisite_course_id INTEGER REFERENCES courses(course_id),
    PRIMARY KEY (course_id, prerequisite_course_id)
);

-- Enhanced Materials Table
CREATE TABLE materials (
    material_id SERIAL PRIMARY KEY,
    classroom_id INTEGER REFERENCES classrooms(classroom_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_type VARCHAR(50) NOT NULL,
    file_url TEXT,
    file_size BIGINT,
    file_type VARCHAR(50),
    is_downloadable BOOLEAN DEFAULT true,
    is_visible BOOLEAN DEFAULT true,
    view_count INTEGER DEFAULT 0,
    material_order INTEGER,
    parent_material_id INTEGER REFERENCES materials(material_id),
    uploaded_by INTEGER REFERENCES base_users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    visibility_start TIMESTAMP,
    visibility_end TIMESTAMP
);

-- Discussion Forums
CREATE TABLE forums (
    forum_id SERIAL PRIMARY KEY,
    classroom_id INTEGER REFERENCES classrooms(classroom_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INTEGER REFERENCES base_users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Forum Topics
CREATE TABLE forum_topics (
    topic_id SERIAL PRIMARY KEY,
    forum_id INTEGER REFERENCES forums(forum_id),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_by INTEGER REFERENCES base_users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_pinned BOOLEAN DEFAULT false,
    last_activity TIMESTAMP
);

-- Forum Replies
CREATE TABLE forum_replies (
    reply_id SERIAL PRIMARY KEY,
    topic_id INTEGER REFERENCES forum_topics(topic_id),
    content TEXT NOT NULL,
    created_by INTEGER REFERENCES base_users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    parent_reply_id INTEGER REFERENCES forum_replies(reply_id)
);

-- Live Sessions
CREATE TABLE live_sessions (
    session_id SERIAL PRIMARY KEY,
    classroom_id INTEGER REFERENCES classrooms(classroom_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    scheduled_start TIMESTAMP NOT NULL,
    scheduled_end TIMESTAMP NOT NULL,
    meeting_link TEXT,
    meeting_password VARCHAR(50),
    host_user_id INTEGER REFERENCES base_users(user_id),
    status VARCHAR(20) DEFAULT 'scheduled',
    recording_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Progress Tracking
CREATE TABLE student_progress (
    progress_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(student_id),
    course_id INTEGER REFERENCES courses(course_id),
    completed_materials INTEGER DEFAULT 0,
    completed_assignments INTEGER DEFAULT 0,
    attendance_percentage DECIMAL(5,2) DEFAULT 0,
    current_grade DECIMAL(5,2),
    last_activity TIMESTAMP,
    UNIQUE(student_id, course_id)
);

-- Feedback and Reviews
CREATE TABLE course_feedback (
    feedback_id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(course_id),
    student_id INTEGER REFERENCES students(student_id),
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    anonymous BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(course_id, student_id)
);

-- Notifications
CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES base_users(user_id),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    notification_type VARCHAR(50),
    related_entity_type VARCHAR(50),
    related_entity_id INTEGER,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity Logs
CREATE TABLE activity_logs (
    log_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES base_users(user_id),
    action_type VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INTEGER,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


