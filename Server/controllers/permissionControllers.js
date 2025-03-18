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

// **Assign a new permission to a user**
exports.assignPermission = async (req, res) => {
  try {
    const { userId, permissionTypeId } = req.body;

    if (!userId || !permissionTypeId) {
      return res
        .status(400)
        .json({ error: 'User ID and Permission Type ID are required' });
    }

    // Check if the permission is already assigned
    const [existing] = await sequelize.query(
      `SELECT * FROM permission_main WHERE userId = ? AND permissionTypeId = ? AND deletedAt IS NULL`,
      { replacements: [userId, permissionTypeId] }
    );

    if (existing.length > 0) {
      return res
        .status(409)
        .json({ error: 'Permission already assigned to user' });
    }

    // Insert the new permission assignment
    await sequelize.query(
      `INSERT INTO permission_main (userId, permissionTypeId, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())`,
      { replacements: [userId, permissionTypeId] }
    );

    res
      .status(201)
      .json({ success: true, message: 'Permission assigned successfully' });
  } catch (error) {
    console.error('Error assigning permission:', error);
    res.status(500).json(error);
  }
};

// **Get all assigned permissions with user and permission details**
exports.getAllAssignedPermissions = async (req, res) => {
  try {
    const [assignedPermissions] = await sequelize.query(`
      SELECT 
        pm.id AS permissionMainId, 
        pm.userId, 
        pm.permissionTypeId, 
        u.name AS userName, 
        u.email AS userEmail, 
        p.type AS permissionType 
      FROM permission_main pm
      LEFT JOIN user u ON pm.userId = u.id
      LEFT JOIN permissions p ON pm.permissionTypeId = p.id
      WHERE pm.deletedAt IS NULL;
    `);

    res.status(200).json({ success: true, data: assignedPermissions });
  } catch (error) {
    console.error('Error fetching assigned permissions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// **Get assigned permissions for a specific user**
exports.getPermissionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const [userPermissions] = await sequelize.query(
      `SELECT pm.id, pm.permissionTypeId, p.type AS permissionType
       FROM permission_main pm
       LEFT JOIN permissions p ON pm.permissionTypeId = p.id
       WHERE pm.userId = ? AND pm.deletedAt IS NULL;`,
      { replacements: [userId] }
    );

    res.status(200).json({ success: true, data: userPermissions });
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// **Update an assigned permission**
exports.updateAssignedPermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissionTypeId } = req.body;

    if (!permissionTypeId) {
      return res
        .status(400)
        .json({ error: 'New Permission Type ID is required' });
    }

    const [existing] = await sequelize.query(
      `SELECT * FROM permission_main WHERE id = ? AND deletedAt IS NULL`,
      { replacements: [id] }
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Assigned permission not found' });
    }

    await sequelize.query(
      `UPDATE permission_main SET permissionTypeId = ?, updatedAt = NOW() WHERE id = ?`,
      { replacements: [permissionTypeId, id] }
    );

    res
      .status(200)
      .json({ success: true, message: 'Permission updated successfully' });
  } catch (error) {
    console.error('Error updating assigned permission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.removeAssignedPermission = async (req, res) => {
  try {
    const { userId, permissionTypeId } = req.params;

    // Check if the assigned permission exists and is not deleted
    const [existing] = await sequelize.query(
      `SELECT * FROM permission_main WHERE userId = ? AND permissionTypeId = ? AND deletedAt IS NULL`,
      { replacements: [userId, permissionTypeId] }
    );

    if (!existing.length) {
      return res.status(404).json({ error: 'Assigned permission not found' });
    }

    // Soft delete the permission by setting `deletedAt`
    await sequelize.query(
      `UPDATE permission_main SET deletedAt = NOW() WHERE userId = ? AND permissionTypeId = ?`,
      { replacements: [userId, permissionTypeId] }
    );

    res
      .status(200)
      .json({ success: true, message: 'Permission removed successfully' });
  } catch (error) {
    console.error('Error removing assigned permission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
