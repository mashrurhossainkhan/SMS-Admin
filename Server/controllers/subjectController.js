const models = require('../models');
const Subject = models.subject;
const User = models.user;
const teacherStSubjectAssociation = models.TeacherStSubjectAssociation;
const { sequelize } = require('../models');
// Get all subject information
const getAllSubjectInfo = async (req, res) => {
  try {
    const subjects = await Subject.findAll({
      order: [['createdAt', 'DESC']], // Sort by creation date in descending order
    });

    if (!subjects.length) {
      return res.status(404).json({ message: 'No subjects found' });
    }

    res.status(200).json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

// Add a new association
const addTeacherStSubjectAssociation = async (req, res) => {
  try {
    const { subjectId, stId, teacherId, visibility } = req.body;

    // Input validation (Optional)
    if (!subjectId || !stId || !teacherId) {
      return res.status(400).json({
        message: 'Subject ID, Student ID, and Teacher ID are required',
      });
    }

    const newAssociation = await teacherStSubjectAssociation.create({
      subjectId,
      stId,
      teacherId,
      visibility: visibility || 1, // Default to 'true' if not provided
    });

    res.status(201).json({
      message: 'Association created successfully',
      data: newAssociation,
    });
  } catch (error) {
    console.error('Error creating association:', error);
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

// Fetch all associations with user information filtered by email
const getAllAssociationsWithUserInfo = async (req, res) => {
  try {
    const { email } = req.params; // Extract email from route parameters

    if (!email) {
      return res.status(400).json({ message: 'Email parameter is required' });
    }

    const query = `
      SELECT 
          assoc.id AS associationId,
          assoc.subjectId,
          assoc.createdAt,
          assoc.updatedAt,
          teacher.id as teacherId,
          teacher.name AS teacherName,
          teacher.email AS teacherEmail,
          student.id as studentId,
          student.name AS studentName,
          student.email AS studentEmail,
          subject.name AS subjectName,
          subject.section AS subjectSection,
          subject.class AS subjectClass
      FROM 
          teacherStSubjectAssociation AS assoc
      JOIN 
          user AS teacher ON assoc.teacherId = teacher.id
      JOIN 
          user AS student ON assoc.stId = student.id
      JOIN 
          subject ON assoc.subjectId = subject.id
      WHERE 
          teacher.email = :email OR student.email = :email
      ORDER BY 
          assoc.createdAt DESC;
    `;

    const associations = await sequelize.query(query, {
      replacements: { email }, // Use parameter binding to inject email safely
      type: sequelize.QueryTypes.SELECT,
    });

    if (!associations.length) {
      return res
        .status(404)
        .json({ message: 'No associations found for the provided email' });
    }

    res.status(200).json(associations);
  } catch (error) {
    console.error('Error fetching associations:', error);
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  getAllSubjectInfo,
  addTeacherStSubjectAssociation,
  getAllAssociationsWithUserInfo,
};
