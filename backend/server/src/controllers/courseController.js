const client = require('../db/index');

const getCourses = async (req, res) => {
  try {
    let query = `
      SELECT c.*, 
             u.first_name || ' ' || u.last_name as teacher_name
      FROM courses c
      JOIN users u ON c.teacher_id = u.user_id
      WHERE c.is_active = true
    `;
    
    // If student, only show their enrolled courses
    if (req.user.user_type === 'student') {
      query += ` AND c.course_id IN (
                  SELECT course_id FROM course_enrollments 
                  WHERE student_id = $1
                )`;
      const result = await client.query(query, [req.user.type_details.student_id]);
      return res.json(result.rows);
    }
    
    // If teacher, only show their courses
    if (req.user.user_type === 'teacher') {
      query += ` AND c.teacher_id = $1`;
      const result = await client.query(query, [req.user.user_id]);
      return res.json(result.rows);
    }
    
    // Admin can see all courses (including inactive ones)
    if (req.user.user_type === 'admin') {
      query = query.replace('WHERE c.is_active = true', ''); // Remove is_active filter for admin
    }
    
    const result = await client.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
};

const getCourseById = async (req, res) => {
  try {
      const { id } = req.params;
      
      let query = `
          SELECT c.*, 
                 u.first_name || ' ' || u.last_name as teacher_name,
                 COUNT(ce.student_id) as enrolled_students
          FROM courses c
          JOIN users u ON c.teacher_id = u.user_id
          LEFT JOIN course_enrollments ce ON c.course_id = ce.course_id
          WHERE c.course_id = $1
      `;
      
      // Only admin can see inactive courses
      if (req.user.user_type !== 'admin') {
          query += ` AND c.is_active = true`;
      }
      
      query += ` GROUP BY c.course_id, u.first_name, u.last_name`;
      
      const result = await client.query(query, [id]);
      
      if (result.rows.length === 0) {
          return res.status(404).json("Course not found");
      }
      
      res.json(result.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
  }
};

const createCourse = async (req, res) => {
  try {
      if (req.user.user_type !== 'admin') {
          return res.status(403).json("Only administrators can create courses");
      }

      const { title, description, teacher_id, start_date, end_date, max_students } = req.body;

      if (!title || !description || !teacher_id) {
          return res.status(400).json("Title, description, and teacher_id are required");
      }

      const teacherCheck = await client.query(
          "SELECT user_id FROM users WHERE user_id = $1 AND user_type = 'teacher'",
          [teacher_id]
      );

      if (teacherCheck.rows.length === 0) {
          return res.status(400).json("Invalid teacher_id provided");
      }

      const newCourse = await client.query(
          `INSERT INTO courses (title, description, teacher_id, start_date, end_date, max_students, is_active, created_at) 
           VALUES ($1, $2, $3, $4, $5, $6, true, CURRENT_TIMESTAMP) 
           RETURNING *`,
          [title, description, teacher_id, start_date, end_date, max_students]
      );

      res.json(newCourse.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
  }
};

const updateCourse = async (req, res) => {
  try {
      const { id } = req.params;
      const { title, description, start_date, end_date, max_students } = req.body;
      
      // Check if course exists
      const courseCheck = await client.query(
          "SELECT * FROM courses WHERE course_id = $1 AND is_active = true", 
          [id]
      );
      
      if (courseCheck.rows.length === 0) {
          return res.status(404).json("Course not found or inactive");
      }
      
      // Only admin or the assigned teacher can update
      if (req.user.user_type !== 'admin' && courseCheck.rows[0].teacher_id !== req.user.user_id) {
          return res.status(403).json("Not authorized to update this course");
      }

      const updateQuery = `
          UPDATE courses 
          SET title = COALESCE($1, title),
              description = COALESCE($2, description),
              start_date = COALESCE($3, start_date),
              end_date = COALESCE($4, end_date),
              max_students = COALESCE($5, max_students),
              updated_at = CURRENT_TIMESTAMP
          WHERE course_id = $6 AND is_active = true
          RETURNING *
      `;
      
      const result = await client.query(updateQuery, [
          title, 
          description, 
          start_date, 
          end_date, 
          max_students, 
          id
      ]);
      
      res.json(result.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).json("Server error");
  }
};

const deleteCourse = async (req, res) => {
    try {
        if (req.user.user_type !== 'admin') {
            return res.status(403).json("Only administrators can delete courses");
        }

        const { id } = req.params;
        
        // Check if course exists and is not already inactive
        const courseCheck = await client.query(
            "SELECT * FROM courses WHERE course_id = $1 AND is_active = true", 
            [id]
        );
        
        if (courseCheck.rows.length === 0) {
            return res.status(404).json("Course not found or already inactive");
        }

        // Soft delete by setting is_active to false
        await client.query(
            "UPDATE courses SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE course_id = $1 RETURNING *",
            [id]
        );
        
        res.json("Course has been deactivated");
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
};

const enrollStudent = async (req, res) => {
    try {
        const { course_id, student_id } = req.body;
  
        // Validate inputs
        if (!course_id || !student_id) {
            return res.status(400).json("Course ID and Student ID are required");
        }
  
        // Check if course exists and is active
        const courseCheck = await client.query(
            "SELECT * FROM courses WHERE course_id = $1 AND is_active = true",
            [course_id]
        );
  
        if (courseCheck.rows.length === 0) {
            return res.status(404).json("Course not found or inactive");
        }
  
        // Check if student exists
        const studentCheck = await client.query(
            "SELECT * FROM students WHERE student_id = $1",
            [student_id]
        );
  
        if (studentCheck.rows.length === 0) {
            return res.status(404).json("Student not found");
        }
  
        // Check if course is full
        const enrollmentCount = await client.query(
            "SELECT COUNT(*) FROM course_enrollments WHERE course_id = $1",
            [course_id]
        );
  
        if (courseCheck.rows[0].max_students && 
            enrollmentCount.rows[0].count >= courseCheck.rows[0].max_students) {
            return res.status(400).json("Course is full");
        }
  
        // Check if student is already enrolled
        const enrollmentCheck = await client.query(
            "SELECT * FROM course_enrollments WHERE course_id = $1 AND student_id = $2",
            [course_id, student_id]
        );
  
        if (enrollmentCheck.rows.length > 0) {
            return res.status(400).json("Already enrolled in this course");
        }
  
        // Create enrollment
        const newEnrollment = await client.query(
            `INSERT INTO course_enrollments (course_id, student_id, enrolled_at) 
             VALUES ($1, $2, CURRENT_TIMESTAMP) 
             RETURNING *`,
            [course_id, student_id]
        );
  
        res.json(newEnrollment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
  };

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollStudent
};