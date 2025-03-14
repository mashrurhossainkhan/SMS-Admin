const models = require('../models');
const User = models.user;
const Credit = models.credit;
const Debit = models.debit;
const Notice = models.notice;

exports.getDashboardSummary = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStudents = await User.count({ where: { userType: 2 } });
    const totalTeachers = await User.count({ where: { userType: 3 } });
    const totalDebitAmount = await Debit.sum('amount', {
      where: { deletedAt: null },
    });
    const totalCreditAmount = await Credit.sum('amount', {
      where: { deletedAt: null },
    });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalStudents,
        totalTeachers,
        totalDebitAmount: totalDebitAmount || 0,
        totalCreditAmount: totalCreditAmount || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not fetch summary data.',
      error: error.message,
    });
  }
};
