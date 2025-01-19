const models = require('../models');
const ResultType = models.resultType;
const Result  = models.result;
const User  = models.user;
const TeacherStSubjectAssociation = models.TeacherStSubjectAssociation;

//result type starts
exports.createResultType = async (req, res) => {
  try {
    const { type } = req.body;

    // Validate the type
    if (!type) {
      return res.status(400).json({ error: 'Type is required' });
    }

    const newResultType = await ResultType.create({ type });

    res.status(201).json({
      message: 'Result type created successfully',
      data: newResultType,
    });
  } catch (error) {
    console.error('Error creating result type:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateResultType = async (req, res) => {
    try {
      const { id } = req.params;
      const { type } = req.body;
  
      // Validate inputs
      if (!type) {
        return res.status(400).json({ error: 'Type is required' });
      }
  
      const resultType = await ResultType.findByPk(id);
  
      if (!resultType) {
        return res.status(404).json({ error: 'Result type not found' });
      }
  
      resultType.type = type;
      await resultType.save();
  
      res.status(200).json({
        message: 'Result type updated successfully',
        data: resultType,
      });
    } catch (error) {
      console.error('Error updating result type:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
  exports.deleteResultType = async (req, res) => {
    try {
      const { id } = req.params;
  
      const resultType = await ResultType.findByPk(id);
  
      if (!resultType) {
        return res.status(404).json({ error: 'Result type not found' });
      }
  
      await resultType.destroy(); // Soft delete since `paranoid: true` is enabled
  
      res.status(200).json({
        message: 'Result type deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting result type:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
  exports.getResultTypes = async (req, res) => {
    try {
      const resultTypes = await ResultType.findAll({
        attributes: ['id', 'type'],
      });
  
      res.status(200).json({
        message: 'Result types retrieved successfully',
        data: resultTypes,
      });
    } catch (error) {
      console.error('Error fetching result types:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
//result type ends

//result starts
exports.createResult = async (req, res) => {
    try {
      const { resultType, stId, teacherId, associationId, marks, remarks } = req.body;
  
      // Validate required fields
      if (!resultType || !stId || !teacherId || !associationId || marks === undefined) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
  
      const newResult = await Result.create({
        resultType,
        stId,
        teacherId,
        associationId,
        marks,
        remarks: remarks || null, // Optional
      });
  
      res.status(201).json({
        message: 'Result created successfully',
        data: newResult,
      });
    } catch (error) {
      console.error('Error creating result:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.updateResult = async (req, res) => {
    try {
      const { id } = req.params;
      const { resultType, stId, teacherId, associationId, marks, remarks } = req.body;
  
      const result = await Result.findByPk(id);
  
      if (!result) {
        return res.status(404).json({ error: 'Result not found' });
      }
  
      // Update fields
      if (resultType) result.resultType = resultType;
      if (stId) result.stId = stId;
      if (teacherId) result.teacherId = teacherId;
      if (associationId) result.associationId = associationId;
      if (marks !== undefined) result.marks = marks;
      if (remarks !== undefined) result.remarks = remarks;
  
      await result.save();
  
      res.status(200).json({
        message: 'Result updated successfully',
        data: result,
      });
    } catch (error) {
      console.error('Error updating result:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.deleteResult = async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await Result.findByPk(id);
  
      if (!result) {
        return res.status(404).json({ error: 'Result not found' });
      }
  
      await result.destroy(); // Soft delete since `paranoid: true` is enabled
  
      res.status(200).json({
        message: 'Result deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting result:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
  exports.getResults = async (req, res) => {
    try {
      const results = await Result.findAll({
        include: [
          { model: ResultType, attributes: ['type'] },
          { model: User, as: 'Student', attributes: ['id', 'name', 'email'] },
          { model: User, as: 'Teacher', attributes: ['id', 'name', 'email'] },
          { model: TeacherStSubjectAssociation, attributes: ['id'] },
        ],
      });
  
      res.status(200).json({
        message: 'Results retrieved successfully',
        data: results,
      });
    } catch (error) {
      console.error('Error fetching results:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  exports.getResultsByStudentId = async (req, res) => {
    try {
      const { stId } = req.params;
  
      // Validate the input
      if (!stId) {
        return res.status(400).json({ error: 'Student ID (stId) is required' });
      }
  
      // Fetch results for the specified student ID
      const results = await Result.findAll({
        where: { stId },
        include: [
          { model: ResultType, attributes: ['type'] },
          { model: User, as: 'Student', attributes: ['id', 'name', 'email'] },
          { model: User, as: 'Teacher', attributes: ['id', 'name', 'email'] },
          { model: TeacherStSubjectAssociation, attributes: ['id'] },
        ],
      });
  
      // If no results are found, return an appropriate response
      if (!results.length) {
        return res.status(404).json({ message: `No results found for student ID ${stId}` });
      }
  
      res.status(200).json({
        message: 'Results retrieved successfully',
        data: results,
      });
    } catch (error) {
      console.error('Error fetching results by stId:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

exports.getResultsByTeacherId = async (req, res) => {
    try {
      const { teacherId } = req.params;
  
      // Validate the input
      if (!teacherId) {
        return res.status(400).json({ error: 'Teacher ID (teacherId) is required' });
      }
  
  
      // Fetch results for the specified teacher ID
      const results = await Result.findAll({
        where: { teacherId },
        include: [
          { model: ResultType, attributes: ['type'] },
          { model: User, as: 'Student', attributes: ['id', 'name', 'email'] },
          { model: User, as: 'Teacher', attributes: ['id', 'name', 'email'] },
          { model: TeacherStSubjectAssociation, attributes: ['id'] },
        ],
      });
  
      // If no results are found, return an appropriate response
      if (!results.length) {
        return res.status(404).json({ message: `No results found for teacher ID ${teacherId}` });
      }
  
      res.status(200).json({
        message: 'Results retrieved successfully',
        data: results,
      });
    } catch (error) {
      console.error('Error fetching results by teacherId:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  exports.getResultsByAssociationId = async (req, res) => {
    try {
      const { associationId } = req.params;
  
      // Validate the input
      if (!associationId) {
        return res.status(400).json({ error: 'Association ID (associationId) is required' });
      }
  
      // Fetch results for the specified association ID
      const results = await Result.findAll({
        where: { associationId },
        include: [
          {
            model: ResultType,
            as: 'resultTypeDetails', // Alias for the relation
            attributes: ['id', 'type'], // Fetch only specific fields
          },
          {
            model: User,
            as: 'studentDetails', // Alias for student association
            attributes: ['id', 'name', 'email'], // Fields to fetch from User for student
          },
          {
            model: User,
            as: 'teacherDetails', // Alias for teacher association
            attributes: ['id', 'name', 'email'], // Fields to fetch from User for teacher
          },

          {
            model: TeacherStSubjectAssociation,
            as: 'associationDetails', // Alias for the association
            attributes: ['id', 'subjectId', 'stId', 'teacherId'], // Fetch relevant fields
          },
        ],
      });
  
      // If no results are found, return an appropriate response
      if (!results.length) {
        return res.status(404).json({ message: `No results found for association ID ${associationId}` });
      }
  
      res.status(200).json({
        message: 'Results retrieved successfully',
        data: results,
      });
    } catch (error) {
      console.error('Error fetching results by associationId:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  
//result ends
