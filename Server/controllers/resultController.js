const models = require('../models');
const ResultType = models.resultType;

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
  
