const models = require('../models');
const TeacherStSubjectAssociation = models.TeacherStSubjectAssociation;
const User = models.user;
const Subject = models.subject;
const STPayment = models.STPayment;


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
            return { error: `Payment information for class ${className} not found` };
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
      filteredResults.sort((a, b) => parseInt(a.class, 10) - parseInt(b.class, 10));
  
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
  