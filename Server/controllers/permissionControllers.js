const models = require('../models');
const Permission = models.permission;
const User = models.user;
const { sequelize } = require('../models');
// Create a new permission
exports.createPermission = async (req, res) => {
  try {
    const { type } = req.body;

    // Validate input
    if (!type) {
      return res.status(400).json({ error: 'Permission type is required' });
    }

    // Check if permission type already exists
    const existingPermission = await Permission.findOne({ where: { type } });
    if (existingPermission) {
      return res.status(409).json({ error: 'Permission type already exists' });
    }

    const newPermission = await Permission.create({ type });
    res.status(201).json({ success: true, data: newPermission });
  } catch (error) {
    console.error('Error creating permission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all permissions (excluding soft deleted)
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll({
      where: { deletedAt: null },
    });
    res.status(200).json({ success: true, data: permissions });
  } catch (error) {
    console.error('Error fetching permissions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single permission by ID
exports.getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findOne({
      where: { id, deletedAt: null },
    });

    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }

    res.status(200).json({ success: true, data: permission });
  } catch (error) {
    console.error('Error fetching permission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a permission type
exports.updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({ error: 'Permission type is required' });
    }

    const permission = await Permission.findOne({
      where: { id, deletedAt: null },
    });

    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }

    await permission.update({ type });

    res.status(200).json({ success: true, data: permission });
  } catch (error) {
    console.error('Error updating permission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a permission (Soft delete)
exports.deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findOne({
      where: { id, deletedAt: null },
    });

    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }

    await permission.destroy(); // Soft delete (if paranoid: true in model)

    res
      .status(200)
      .json({ success: true, message: 'Permission deleted successfully' });
  } catch (error) {
    console.error('Error deleting permission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUsersExceptStudents = async (req, res) => {
  try {
    const [users] = await sequelize.query(`
        SELECT id, name, email, userType, createdAt
        FROM user
        WHERE userType != 2 AND deletedAt IS NULL;
      `);

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
