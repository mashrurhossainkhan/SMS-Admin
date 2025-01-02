const models = require('../models');
const TeacherStSubjectAssociation = models.TeacherStSubjectAssociation;

const insertAssociationRecords = async (req, res) => {
  const { studentId, teacherId, subjectId } = req.body;

  // Validate required fields
  if (!studentId || !teacherId || !subjectId) {
    return res.status(400).json({
      message: 'studentId, teacherId, and subjectId are required.',
    });
  }

  try {
    // Check if the record already exists
    const existingAssociation = await TeacherStSubjectAssociation.findOne({
      where: {
        stId: studentId,
        teacherId,
        subjectId,
      },
    });

    if (existingAssociation) {
      return res.status(409).json({
        message: 'Association already exists.',
      });
    }

    // Create a new record in the database
    const newAssociation = await TeacherStSubjectAssociation.create({
      stId: studentId,
      teacherId,
      subjectId,
      visibility: 1, // Optional: Default handled in the model
    });

    return res.status(201).json({
      message: 'Association created successfully.',
      data: newAssociation,
    });
  } catch (error) {
    console.error('Error creating association:', error);
    return res.status(500).json({
      message: 'An error occurred while creating the association.',
      error: error.message,
    });
  }
};

module.exports = { insertAssociationRecords };
