//insert, read, delete in Company Controller
//Mashrur Hossain Khan
//15Nov, 2022
const models = require('../../models');
const Company = models.company;
const CompanyMeta = models.company_meta;
//const bcrypt = require("bcrypt");
//create Company insetion
exports.addCompanyInfo = async function (req, res) {
  let body = req.body;
  //let hashCompanyPassword = await bcrypt.hash(body.password, 10);
  try {
    let company = await Company.create({
      company_name: body.companyName,
      visibility: 1,
      //password: hashCompanyPassword,
    });
    return res.send({
      company_id: company.id, //this id will be in frontend
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

//in frontend if the id from addCompanyInfo, then insert in add CompanyMetaInfo
exports.addCompanyMetaInfo = async function (req, res) {
  let body = req.body;

  try {
    let company_meta = await CompanyMeta.create({
      address: body.companyAddress,
      phn_no: body.companyContactNo,
      owner_name: body.companyOwnerName,
      companyEmail: body.companyEmail,
      company_id: body.companyIDfromReg,
      visibility: 1,
    });
    return res.send(company_meta);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

//signin Company
