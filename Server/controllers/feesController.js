const models = require('../models');
const Fees = models.fees;
const { Op } = require('sequelize');

// Create a new Fee
exports.createFee = async (req, res) => {
  try {
    const { class: className, fees } = req.body;

    if (!className || fees === undefined) {
      return res.status(400).json({ error: 'Class and fees are required' });
    }

    // Check if fee for this class already exists
    const existingFee = await Fees.findOne({ where: { class: className } });
    if (existingFee) {
      return res
        .status(400)
        .json({ error: `Fee for class '${className}' already exists.` });
    }

    const newFee = await Fees.create({ class: className, fees });

    res.status(201).json({
      message: '✅ Fee created successfully',
      data: newFee,
    });
  } catch (error) {
    console.error('❌ Error creating fee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all fees
exports.getFees = async (req, res) => {
  try {
    const allFees = await Fees.findAll({
      attributes: ['id', 'class', 'fees'],
    });

    res.status(200).json({
      message: '✅ Fees retrieved successfully',
      data: allFees,
    });
  } catch (error) {
    console.error('❌ Error fetching fees:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get fee by ID
exports.getFeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const fee = await Fees.findByPk(id);

    if (!fee) {
      return res.status(404).json({ error: 'Fee not found' });
    }

    res.status(200).json({
      message: '✅ Fee retrieved successfully',
      data: fee,
    });
  } catch (error) {
    console.error('❌ Error fetching fee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update Fee
exports.updateFee = async (req, res) => {
  try {
    const { id } = req.params;
    const { class: className, fees } = req.body;

    const fee = await Fees.findByPk(id);

    if (!fee) {
      return res.status(404).json({ error: 'Fee not found' });
    }

    if (className !== undefined) fee.class = className;
    if (fees !== undefined) fee.fees = fees;

    await fee.save();

    res.status(200).json({
      message: '✅ Fee updated successfully',
      data: fee,
    });
  } catch (error) {
    console.error('❌ Error updating fee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Fee (Soft delete)
exports.deleteFee = async (req, res) => {
  try {
    const { id } = req.params;

    const fee = await Fees.findByPk(id);

    if (!fee) {
      return res.status(404).json({ error: 'Fee not found' });
    }

    await fee.destroy(); // Soft delete if `paranoid: true`

    res.status(200).json({
      message: '✅ Fee deleted successfully',
    });
  } catch (error) {
    console.error('❌ Error deleting fee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
