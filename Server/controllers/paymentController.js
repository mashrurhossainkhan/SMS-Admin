const models = require('../models');
const TeacherStSubjectAssociation = models.TeacherStSubjectAssociation;
const User = models.user;
const Subject = models.subject;
const STPayment = models.STPayment;
const Credit = models.credit;
const Debit = models.debit;
const { sequelize } = require('../models');

exports.getStudentAmounts = async function (req, res) {
  try {
    // Extract pagination parameters from query
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const offset = (page - 1) * limit;

    // Step 1: Get all stId and subjectId from TeacherStSubjectAssociation with pagination
    const associations = await TeacherStSubjectAssociation.findAll({
      attributes: ['stId', 'subjectId'],
      offset, // Skip these many records
      limit, // Fetch only this many records
    });

    if (!associations.length) {
      return res.status(404).json({ message: 'No associations found' });
    }

    // Step 2-5: Process data and fetch details for each association
    const results = await Promise.all(
      associations.map(async (assoc) => {
        const { stId, subjectId } = assoc;

        // Step 2: Get user details where stId = id
        const student = await User.findOne({
          where: { id: stId },
          attributes: ['id', 'name', 'email'],
        });

        if (!student) {
          return { error: `Student with ID ${stId} not found` };
        }

        // Step 3: Get subject details where subjectId = id
        const subject = await Subject.findOne({
          where: { id: subjectId },
          attributes: ['class'],
        });

        if (!subject) {
          return { error: `Subject with ID ${subjectId} not found` };
        }

        const { class: className } = subject;

        // Step 4: Get payment information for the class
        const payment = await STPayment.findOne({
          where: { class: className },
          attributes: ['amount'],
        });

        if (!payment) {
          return {
            error: `Payment information for class ${className} not found`,
          };
        }

        // Step 5: Prepare result JSON
        return {
          student: {
            id: student.id,
            name: student.name,
            email: student.email,
          },
          class: className,
          amount: payment.amount,
        };
      })
    );

    // Step 6: Filter out errors and sort results by class
    const filteredResults = results.filter((result) => !result.error);

    // Sort the filtered results by class
    filteredResults.sort(
      (a, b) => parseInt(a.class, 10) - parseInt(b.class, 10)
    );

    // Return the sorted and paginated results
    res.status(200).json({
      data: filteredResults,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: associations.length,
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.deleteCreditsById_1 = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id) {
      return res.status(400).json({ error: 'Credit ID is required' });
    }

    // Find the credit, including soft-deleted records
    const credit = await Credit.findOne({ where: { id }, paranoid: false });

    console.log('Found Credit:', credit);

    if (!credit) {
      return res.status(404).json({ error: 'Credit not found' });
    }

    // Soft delete (marks `deletedAt`)
    await credit.destroy();

    res.status(200).json({ message: 'Credit deleted successfully' });
  } catch (error) {
    console.error('Error deleting credit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteDebitById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the `id`
    if (!id) {
      return res.status(400).json({ error: 'Debit ID is required' });
    }

    // Check if the credit exists
    const debit = await Debit.findByPk(id);
    if (!debit) {
      return res.status(404).json({ error: 'debit not found' });
    }

    // Delete the credit (soft delete if `paranoid` is enabled)
    await debit.destroy();

    res.status(200).json({ message: 'debit deleted successfully' });
  } catch (error) {
    console.error('Error deleting debit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCreditsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate `userId`
    if (!userId) {
      return res.status(400).json({ error: 'UserId is required' });
    }

    // Fetch credits by userId
    const credits = await Credit.findAll({
      where: { userId },
      order: [['date', 'DESC']], // Optional: Order by date descending
    });

    // Return the result
    if (credits.length === 0) {
      return res
        .status(404)
        .json({ message: 'No credits found for this user' });
    }

    res.status(200).json(credits);
  } catch (error) {
    console.error('Error fetching credits:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getDebitsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate `userId`
    if (!userId) {
      return res.status(400).json({ error: 'UserId is required' });
    }

    // Fetch credits by userId
    const debits = await Debit.findAll({
      where: { userId },
      order: [['date', 'DESC']], // Optional: Order by date descending
    });

    // Return the result
    if (debits.length === 0) {
      return res
        .status(404)
        .json({ message: 'No credits found for this user' });
    }

    res.status(200).json(debits);
  } catch (error) {
    console.error('Error fetching credits:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addCredit = async function (req, res) {
  try {
    // Extract data from req.body, including date from the frontend
    const { userId, amount, type, comment, date } = req.body;

    // Validate required fields
    if (!userId || !amount || !type || !date) {
      return res
        .status(400)
        .json({ error: 'userId, amount, type, and date are required' });
    }

    // Validate that the date is in a correct format
    const creditDate = new Date(date);
    if (isNaN(creditDate)) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    // Insert the new credit entry with the frontend provided date
    const newCredit = await Credit.create({
      userId,
      amount,
      type,
      comment: comment || null, // Optional comment
      date: creditDate,
    });

    // Respond with the created entry
    res.status(201).json({
      message: 'Credit entry added successfully',
      data: newCredit,
    });
  } catch (error) {
    console.error('Error adding credit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addDedit = async function (req, res) {
  try {
    // Extract data from req.body
    const { userId, amount, type, comment } = req.body;

    // Validate required fields
    if (!userId || !amount || !type) {
      return res
        .status(400)
        .json({ error: 'userId, amount, and type are required' });
    }

    // Insert the new credit entry
    const newDedit = await Debit.create({
      userId,
      amount,
      type,
      comment: comment || null, // Optional comment
      date: new Date().toISOString().split('T')[0],
    });

    // Respond with the created entry
    res.status(201).json({
      message: 'Debit entry added successfully',
      data: newDedit,
    });
  } catch (error) {
    console.error('Error adding credit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCredits = async (req, res) => {
  try {
    const [credits] = await sequelize.query(`
      SELECT 
        c.id, 
        c.type, 
        c.amount, 
        c.userId, 
        c.comment, 
        c.date, 
        c.createdAt, 
        c.updatedAt, 
        c.deletedAt, 
        u.name AS user_name, 
        u.email AS user_email
      FROM credits c
      LEFT JOIN user u ON c.userId = u.id
      WHERE c.deletedAt IS NULL;  -- Excludes soft-deleted records
    `);

    res.status(200).json({
      success: true,
      data: credits,
    });
  } catch (error) {
    console.error('Error fetching credits:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not fetch credit information.',
      error: error.message,
    });
  }
};

exports.getAllDebits = async (req, res) => {
  try {
    const [debits] = await sequelize.query(`
      SELECT 
        d.id, 
        d.type, 
        d.amount, 
        d.userId, 
        d.comment, 
        d.date, 
        d.createdAt, 
        d.updatedAt, 
        d.deletedAt, 
        u.name AS user_name, 
        u.email AS user_email
      FROM debits d
      LEFT JOIN user u ON d.userId = u.id
      WHERE d.deletedAt IS NULL;  -- Exclude soft-deleted records
    `);

    res.status(200).json({
      success: true,
      data: debits,
    });
  } catch (error) {
    console.error('Error fetching debits:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not fetch debit information.',
      error: error.message,
    });
  }
};
