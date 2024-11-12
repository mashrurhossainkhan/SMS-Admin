const models = require('../models');
const Subject = models.subject;

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

module.exports = { getAllSubjectInfo };
