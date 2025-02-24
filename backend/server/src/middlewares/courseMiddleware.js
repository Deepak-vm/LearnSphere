const client = require('../db/index');

const authenticateUser = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json("Not authenticated");
        }
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Server error" });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        if (req.user.user_type !== 'admin') {
            return res.status(403).json("Admin access required");
        }
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Server error" });
    }
};

const isTeacher = async (req, res, next) => {
    try {
        if (req.user.user_type !== 'teacher') {
            return res.status(403).json("Teacher access required");
        }
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Server error" });
    }
};

const isStudent = async (req, res, next) => {
    try {
        if (req.user.user_type !== 'student') {
            return res.status(403).json("Student access required");
        }
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Server error" });
    }
};

const isTeacherOrAdmin = async (req, res, next) => {
    try {
        const courseId = req.params.id;
        
        if (req.user.user_type === 'admin') {
            return next();
        }

        if (req.user.user_type === 'teacher') {
            const course = await client.query(
                "SELECT * FROM courses WHERE course_id = $1 AND teacher_id = $2",
                [courseId, req.user.user_id]
            );

            if (course.rows.length === 0) {
                return res.status(403).json({error:"Not authorized to access this course"});
            }
            return next();
        }

        return res.status(403).json("Not authorized");
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Server error" });
    }
};

const courseExists = async (req, res, next) => {
    try {
        const courseId = req.params.id || req.params.course_id;
        
        const course = await client.query(
            "SELECT * FROM courses WHERE course_id = $1",
            [courseId]
        );

        if (course.rows.length === 0) {
            return res.status(404).json({error:"Course not found"});
        }

        req.course = course.rows[0];
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Server error" });
    }
};

const isCourseActive = async (req, res, next) => {
    try {
        const courseId = req.params.id || req.params.course_id;
        
        const course = await client.query(
            "SELECT * FROM courses WHERE course_id = $1 AND is_active = true",
            [courseId]
        );

        if (course.rows.length === 0) {
            return res.status(400).json({error:"Course is not active"});
        }

        next();
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Server error" });
    }
};

const validateEnrollment = async (req, res, next) => {
    try {
        const { course_id } = req.params;
        const student_id = req.user.type_details.student_id;

        const enrollmentCheck = await client.query(
            "SELECT * FROM course_enrollments WHERE course_id = $1 AND student_id = $2",
            [course_id, student_id]
        );

        if (enrollmentCheck.rows.length > 0) {
            return res.status(400).json("Already enrolled in this course");
        }

        const course = await client.query(
            "SELECT max_students FROM courses WHERE course_id = $1",
            [course_id]
        );

        if (course.rows[0].max_students) {
            const currentEnrollments = await client.query(
                "SELECT COUNT(*) FROM course_enrollments WHERE course_id = $1",
                [course_id]
            );

            if (currentEnrollments.rows[0].count >= course.rows[0].max_students) {
                return res.status(400).json("Course is full");
            }
        }

        next();
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    authenticateUser,
    isAdmin,
    isTeacher,
    isStudent,
    isTeacherOrAdmin,
    courseExists,
    isCourseActive,
    validateEnrollment
};