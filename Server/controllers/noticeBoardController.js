// Model import
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { upload } = require('../config/multer');
const models = require('../models');
const Notice = models.notice_board;

// Add new notice
//http://localhost:5000/api/create/notice
exports.addNotice = async function (req, res) {
  let body = req.body;
  try {
    await Notice.create({
      date: body.date,
      noticeTitle: body.noticeTitle,
      noticeDetails: body.noticeDetails,
      // noticeFile: imagePath,
      visibility: 'true',
    })
      .then((notice) => {
        //console.log("user created");
        res.status(200).json('Notice has created successfully');
      })
      .catch((err) => {
        return res.status(500).json('Something error there ' + err);
      });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

//get All notices
//http://localhost:5000/api/all/notice
exports.getAllNotices = async function (req, res) {
  try {
    await Notice.findAll({
      order: [['createdAt', 'DESC']], // Sort by 'createdAt' field in descending order
      limit: 30,
    })
      .then((notices) => {
        res.status(200).json(notices);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

//get notices by ID
//http://localhost:5000/api/notice/:id
exports.getNoticesByID = async function (req, res) {
  try {
    let noticeId = req.params.id;
    await Notice.findOne({
      where: { id: noticeId, visibility: 'true' },
    })
      .then((notice) => {
        res.status(200).json(notice);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

//update notice
//http://localhost:5000/api/notice/update/1
exports.updateNoticesByID = async function (req, res) {
  try {
    let noticeId = req.params.id;

    await Notice.update(
      {
        date: req.body.date,
        noticeTitle: req.body.noticeTitle,
        noticeDetails: req.body.noticeDetails,
        noticeFile: req.body.noticeFile,
      },
      {
        where: { id: noticeId, visibility: 'true' },
      }
    )
      .then((notice) => {
        res.status(200).json(notice);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

//update notice visibility to false
//http://localhost:5000/api/notice/update/visibility/false/3
exports.updateNoticesVisibilityFalseByID = async function (req, res) {
  try {
    let noticeId = req.params.id;

    await Notice.update(
      {
        visibility: 'false',
      },
      {
        where: { id: noticeId, visibility: 'true' },
      }
    )
      .then((notice) => {
        res.status(200).json(notice);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

//update notice visibility to true
//http://localhost:5000/api/notice/update/visibility/true/3
exports.updateNoticesVisibilityTrueByID = async function (req, res) {
  try {
    let noticeId = req.params.id;

    await Notice.update(
      {
        visibility: 'true',
      },
      {
        where: { id: noticeId, visibility: 'false' },
      }
    )
      .then((notice) => {
        res.status(200).json(notice);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
