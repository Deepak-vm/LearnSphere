const client = require('../db/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Get user with their type-specific details
    const result = await client.query(
      `SELECT u.*, 
              CASE 
                WHEN a.admin_id IS NOT NULL THEN json_build_object('admin_id', a.admin_id, 'department', a.department)
                WHEN t.teacher_id IS NOT NULL THEN json_build_object('teacher_id', t.teacher_id, 'employment_status', t.employment_status)
                WHEN s.student_id IS NOT NULL THEN json_build_object('student_id', s.student_id, 'registration_number', s.registration_number, 'current_semester', s.current_semester)
              END as type_details
       FROM users u
       LEFT JOIN admins a ON u.user_id = a.user_id
       LEFT JOIN teachers t ON u.user_id = t.user_id
       LEFT JOIN students s ON u.user_id = s.user_id
       WHERE u.username = $1`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json("Invalid credentials");
    }

    // const validPassword = await bcrypt.compare(password, result.rows[0].password_hash);
    if (password != result.rows[0].password_hash) {
      return res.status(401).json("Invalid credentials");
    }

    // Update last login
    await client.query(
      "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = $1",
      [result.rows[0].user_id]
    );

    const token = jwt.sign(
      {
        user_id: result.rows[0].user_id,
        user_type: result.rows[0].user_type,
        type_details: result.rows[0].type_details
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
};

module.exports = { login };
