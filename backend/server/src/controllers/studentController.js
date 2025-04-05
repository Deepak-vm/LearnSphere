const client = require('../db/index.js');

exports.createStudent = async (req, res) => {
  // Validate request
  let { name, email, roll_no, course } = req.body;
  if (!name || !email || !roll_no || !course) {
    return res.status(400).send({
      message: "Content cannot be empty! Name, email, roll_no, and course are required."
    });
  }
  const insertQuery = `
    INSERT INTO students (name, email, roll_no, course, enrollment_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  
  const values = [
    req.body.name,
    req.body.email,
    req.body.roll_no,
    req.body.course,
    req.body.enrollmentDate || new Date()
  ];

  try {
    const result = await client.query(insertQuery, values);
    res.status(201).send(result.rows[0]);
  } catch (err) {
    console.error('Error creating student:', err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Student."
    });
  }
};

exports.getStudents = async (req, res) => {
  const findAllQuery = `
    SELECT * FROM students
    ORDER BY roll_no ASC;
  `;

  try {
    const result = await client.query(findAllQuery);
    res.send(result.rows);
  } catch (err) {
    console.error('Error retrieving students:', err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving students."
    });
  }
};

exports.getStudentsById = async (req, res) => {
  const id = req.params.roll_no;
  
  const findOneQuery = `
    SELECT * FROM students
    WHERE id = $1;
  `;

  try {
    const result = await client.query(findOneQuery, [id]);
    
    if (result.rows.length > 0) {
      res.send(result.rows[0]);
    } else {
      res.status(404).send({
        message: `Cannot find Student with id=${id}.`
      });
    }
  } catch (err) {
    console.error('Error retrieving student:', err);
    res.status(500).send({
      message: "Error retrieving Student with id=" + id
    });
  }
};

exports.updateStudent = async (req, res) => {
  const id = req.params.roll_no;
  
  const findQuery = `
    SELECT * FROM students
    WHERE roll_no = $1;
  `;
  
  const updateQuery = `
    UPDATE students
    SET name = $1,
        email = $2,
        roll_no = $3,
        course = $4,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *;
  `;

  try {
    const findResult = await client.query(findQuery, [id]);
    
    if (findResult.rows.length === 0) {
      return res.status(404).send({
        message: `Cannot update Student with id=${id}. Student not found!`
      });
    }
    
    const currentStudent = findResult.rows[0];
    const values = [
      req.body.name || currentStudent.name,
      req.body.email || currentStudent.email,
      req.body.roll_no || currentStudent.roll_no,
      req.body.course || currentStudent.course,
      id
    ];
    
    const updateResult = await client.query(updateQuery, values);
    res.send({
      message: "Student was updated successfully.",
      data: updateResult.rows[0]
    });
    
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).send({
      message: "Error updating Student with id=" + id
    });
  }
};

exports.deleteStudent = async (req, res) => {
  const id = req.params.id;
  
  const deleteQuery = `
    DELETE FROM students
    WHERE id = $1
    RETURNING *;
  `;

  try {
    const result = await client.query(deleteQuery, [id]);
    
    if (result.rows.length > 0) {
      res.send({
        message: "Student was deleted successfully!",
        data: result.rows[0]
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
      });
    }
    } catch (err) {
      console.error('Error deleting student:', err);
      res.status(500).send({
        message: "Could not delete Student with id=" + id
      });
    }
  };