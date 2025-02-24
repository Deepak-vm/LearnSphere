const client = require('../db/index');

const createBatch = async (req, res) => {
    try {
        const { name, start_year, end_year } = req.body;

        // Validate input
        if (!name || !start_year || !end_year) {
            return res.status(400).json("All fields are required");
        }

        if (end_year <= start_year) {
            return res.status(400).json("End year must be greater than start year");
        }

        const newBatch = await client.query(
            "INSERT INTO batches (name, start_year, end_year) VALUES ($1, $2, $3) RETURNING *",
            [name, start_year, end_year]
        );

        res.json(newBatch.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
};

const getAllBatches = async (req, res) => {
    try {
        const result = await client.query(
            `SELECT b.*, 
                    COUNT(sd.student_id) as student_count
             FROM batches b
             LEFT JOIN student_details sd ON b.batch_id = sd.batch_id
             GROUP BY b.batch_id
             ORDER BY b.start_year DESC`
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
};

const getBatchById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const batch = await client.query(
            `SELECT b.*, 
                    COUNT(sd.student_id) as student_count
             FROM batches b
             LEFT JOIN student_details sd ON b.batch_id = sd.batch_id
             WHERE b.batch_id = $1
             GROUP BY b.batch_id`,
            [id]
        );

        if (batch.rows.length === 0) {
            return res.status(404).json("Batch not found");
        }

        res.json(batch.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
};

const updateBatch = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, start_year, end_year, is_active } = req.body;

        // Validate input
        if (!name || !start_year || !end_year) {
            return res.status(400).json("All fields are required");
        }

        if (end_year <= start_year) {
            return res.status(400).json("End year must be greater than start year");
        }

        const updatedBatch = await client.query(
            "UPDATE batches SET name = $1, start_year = $2, end_year = $3, is_active = $4 WHERE batch_id = $5 RETURNING *",
            [name, start_year, end_year, is_active, id]
        );

        if (updatedBatch.rows.length === 0) {
            return res.status(404).json("Batch not found");
        }

        res.json(updatedBatch.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
};

const deleteBatch = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if batch has students
        const studentCheck = await client.query(
            "SELECT COUNT(*) FROM student_details WHERE batch_id = $1",
            [id]
        );

        if (studentCheck.rows[0].count > 0) {
            return res.status(400).json("Cannot delete batch with assigned students");
        }

        const result = await client.query(
            "DELETE FROM batches WHERE batch_id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json("Batch not found");
        }

        res.json("Batch deleted successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
};

const assignStudentsToBatch = async (req, res) => {
    const client = await client.connect();
    try {
        const { id } = req.params;
        const { student_ids } = req.body;

        if (!Array.isArray(student_ids) || student_ids.length === 0) {
            return res.status(400).json("Valid student IDs array is required");
        }

        await client.query('BEGIN');

        // Verify batch exists
        const batchExists = await client.query(
            "SELECT * FROM batches WHERE batch_id = $1",
            [id]
        );

        if (batchExists.rows.length === 0) {
            throw new Error("Batch not found");
        }

        // Update student_details for each student
        const updatePromises = student_ids.map(student_id =>
            client.query(
                "UPDATE student_details SET batch_id = $1 WHERE student_id = $2 RETURNING *",
                [id, student_id]
            )
        );

        const results = await Promise.all(updatePromises);
        
        // Check if all updates were successful
        const updatedStudents = results.map(result => result.rows[0]);
        if (updatedStudents.some(student => !student)) {
            throw new Error("Some student IDs are invalid");
        }

        await client.query('COMMIT');
        res.json({
            message: "Students assigned successfully",
            updated_students: updatedStudents
        });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err.message);
        res.status(500).json(err.message || "Server error");
    } finally {
        client.release();
    }
};

const getBatchStudents = async (req, res) => {
    try {
        const { id } = req.params;
        
        const students = await client.query(
            `SELECT u.user_id, u.first_name, u.last_name, u.email, 
                    sd.admission_number, sd.current_semester
             FROM users u
             JOIN student_details sd ON u.user_id = sd.student_id
             WHERE sd.batch_id = $1
             ORDER BY sd.admission_number`,
            [id]
        );

        res.json(students.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
};

module.exports = {
    createBatch,
    getAllBatches,
    getBatchById,
    updateBatch,
    deleteBatch,
    assignStudentsToBatch,
    getBatchStudents
};

