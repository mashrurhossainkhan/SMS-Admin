const models = require('../models');
const Speeches = models.speech;

// Create a new speech
exports.createSpeech = async (req, res) => {
  try {
    const { speechBy, speech, visibility } = req.body;

    if (!speechBy || !speech) {
      return res.status(400).json({ message: 'speechBy and speech are required' });
    }

    const newSpeech = await Speeches.create({
      speechBy,
      speech,
      visibility: visibility || 'true', // Default to 'true' if not provided
    });

    res.status(201).json({ message: 'Speech created successfully', data: newSpeech });
  } catch (error) {
    console.error('Error creating speech:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all speeches (Optional filtering by visibility)
exports.getAllSpeeches = async (req, res) => {
  try {
    const { visibility } = req.query;

    const filter = visibility ? { where: { visibility } } : {};

    const speeches = await Speeches.findAll(filter);

    res.status(200).json({ data: speeches });
  } catch (error) {
    console.error('Error fetching speeches:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a speech by ID
exports.getSpeechById = async (req, res) => {
  try {
    const { id } = req.params;

    const speech = await Speeches.findByPk(id);

    if (!speech) {
      return res.status(404).json({ message: 'Speech not found' });
    }

    res.status(200).json({ data: speech });
  } catch (error) {
    console.error('Error fetching speech:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a speech by ID
exports.updateSpeech = async (req, res) => {
  try {
    const { id } = req.params;
    const { speechBy, speech, visibility } = req.body;

    const speechToUpdate = await Speeches.findByPk(id);

    if (!speechToUpdate) {
      return res.status(404).json({ message: 'Speech not found' });
    }

    await speechToUpdate.update({
      speechBy: speechBy || speechToUpdate.speechBy,
      speech: speech || speechToUpdate.speech,
      visibility: visibility !== undefined ? visibility : speechToUpdate.visibility,
    });

    res.status(200).json({ message: 'Speech updated successfully', data: speechToUpdate });
  } catch (error) {
    console.error('Error updating speech:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Soft delete a speech (Mark as deleted)
exports.deleteSpeech = async (req, res) => {
  try {
    const { id } = req.params;

    const speechToDelete = await Speeches.findByPk(id);

    if (!speechToDelete) {
      return res.status(404).json({ message: 'Speech not found' });
    }

    await speechToDelete.destroy(); // Soft delete (sets deletedAt)
    res.status(200).json({ message: 'Speech deleted successfully' });
  } catch (error) {
    console.error('Error deleting speech:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Restore a soft-deleted speech
exports.restoreSpeech = async (req, res) => {
  try {
    const { id } = req.params;

    const speechToRestore = await Speeches.findOne({
      where: { id },
      paranoid: false, // Include soft-deleted records
    });

    if (!speechToRestore) {
      return res.status(404).json({ message: 'Speech not found' });
    }

    await speechToRestore.restore(); // Restores soft-deleted record
    res.status(200).json({ message: 'Speech restored successfully', data: speechToRestore });
  } catch (error) {
    console.error('Error restoring speech:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
