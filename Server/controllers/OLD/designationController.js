//insert, read, delete in designation Controller
//Mashrur Hossain Khan
//15Nov, 2022
const models = require('../../models');
const Designation = models.designation;

exports.addDesignation = async function (req, res) {
  let body = req.body;
  try {
    let designation = await Designation.create({
      designation_name: body.designation_name,
      company_id: body.company_id,
    });

    return res.send(designation);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

// Get all thee roles
exports.getDesignationsByCompanyID = async function (req, res) {
  try {
    let companyId = req.body.companyId;
    await Designation.findOne({
      where: {
        id: companyId,
      },
    })
      .then((designation) => {
        res.status(200).json(designation);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

exports.deleteDesignationsByID = async function (req, res) {
  console.log(`sdfgsfgddf`);
  try {
    let Id = req.params.id;
    console.log(`ID: ${Id}`);

    await Designation.destroy({
      where: {
        id: Id,
      },
    })
      .then((designation) => {
        res.status(200).json(designation);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
