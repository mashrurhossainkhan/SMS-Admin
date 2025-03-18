'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

// Get all database config keys
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Check connection with DB
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// All association sync
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Initialize DB with ORM
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models
// New models
db.notice_board = require('./notice_board')(sequelize, Sequelize);
db.user = require('./user')(sequelize, Sequelize);
db.userType = require('./UserType')(sequelize, Sequelize);
db.classRoutine = require('./classRoutine')(sequelize, Sequelize);
db.attendance = require('./attendance')(sequelize, Sequelize);
db.studentMeta = require('./studentMeta')(sequelize, Sequelize);
db.teacherMeta = require('./teacherMeta')(sequelize, Sequelize);
db.permission = require('./permission')(sequelize, Sequelize);
db.teacherMetaAchievement = require('./teacherMetaAchievements')(
  sequelize,
  Sequelize
);
db.permissionMain = require('./permissionMain')(sequelize, Sequelize);
db.welcomeNote = require('./welcomeNote')(sequelize, Sequelize);
db.principalNote = require('./pricipalNote')(sequelize, Sequelize);
db.achievements = require('./schoolAchievements')(sequelize, Sequelize);
db.upcomingEvents = require('./upComingEvents')(sequelize, Sequelize);
db.alumni = require('./alumni')(sequelize, Sequelize);
db.jobPosts = require('./jobPosts')(sequelize, Sequelize);
db.subject = require('./subject')(sequelize, Sequelize);
db.STPayment = require('./stPayments')(sequelize, Sequelize);
db.credit = require('./Credit')(sequelize, Sequelize);
db.speech = require('./speech')(sequelize, Sequelize);
db.debit = require('./Debit')(sequelize, Sequelize);
db.resultType = require('./resultType')(sequelize, Sequelize);
db.result = require('./Result')(sequelize, Sequelize);
db.TeacherStSubjectAssociation = require('./TeacherStSubjectAssociation')(
  sequelize,
  Sequelize
);

db.TeacherStSubjectAssociation.associate = (models) => {
  db.TeacherStSubjectAssociation.belongsTo(models.User, {
    foreignKey: 'teacherId',
    as: 'teacher',
  });
  db.TeacherStSubjectAssociation.belongsTo(models.User, {
    foreignKey: 'stId',
    as: 'student',
  });
};

db.user.hasMany(db.TeacherStSubjectAssociation, {
  foreignKey: 'teacherId',
  as: 'teachingAssociations',
});
db.user.hasMany(db.TeacherStSubjectAssociation, {
  foreignKey: 'stId',
  as: 'studentAssociations',
});

db.result.belongsTo(db.resultType, {
  foreignKey: 'resultType', // Foreign key in Result table
  as: 'resultTypeDetails', // Alias for the association
});

db.result.belongsTo(db.user, {
  foreignKey: 'stId', // Foreign key in Result table
  as: 'studentDetails', // Alias for the association
});

db.result.belongsTo(db.user, {
  foreignKey: 'teacherId', // Foreign key in Result table
  as: 'teacherDetails', // Alias for the association
});

db.result.belongsTo(db.TeacherStSubjectAssociation, {
  foreignKey: 'associationId', // The foreign key in the Result table
  as: 'associationDetails', // Alias for the association
});

db.TeacherStSubjectAssociation.belongsTo(db.user, {
  foreignKey: 'stId',
  as: 'student', // Alias for reverse association
});

db.user.hasMany(db.TeacherStSubjectAssociation, {
  foreignKey: 'stId',
  as: 'subjectAssociations', // Alias for this association
});

// Datasource syc
db.sequelize.sync();

module.exports = db;
