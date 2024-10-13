// Model import
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { upload } = require('../config/multer');
const models = require('../models');
const Notice = models.notice_board;

// Add new notice
//http://localhost:5000/api/create/notice
exports.addNotice = function (req, res) {
  let body = req.body;
  try {
    upload(req, res, async (err) => {
      // Handle Multer errors
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res
            .status(400)
            .json({ error: 'File size too big. Max size is 5MB.' });
        }
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }

      let imagePath = null;

      if (req.file) {
        const compressedImagePath = path.join(
          UPLOADS_DIR,
          `compressed-${req.file.filename}`
        );

        imagePath = compressedImagePath; // Store the path to the compressed image

        // Optionally, clean up the original image after compression
        fs.unlinkSync(req.file.path); // Delete the original uploaded image
      }
      console.log('notice board date:' + body.date);
      console.log('notice board noticeTitle:' + body.noticeTitle);
      console.log('notice board noticeDetails:' + body.noticeDetails);
      console.log('notice board noticeFile:' + imagePath);
      await Notice.create({
        date: body.date,
        noticeTitle: body.noticeTitle,
        noticeDetails: body.noticeDetails,
        noticeFile: imagePath,
        visibility: 'true',
      })
        .then((notice) => {
          //console.log("user created");
          res.status(200).json('Notice has created successfully');
        })
        .catch((err) => {
          return res.status(500).json('Something error there ' + err);
        });
    });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
};

//get All notices
//http://localhost:5000/api/all/notice
exports.getAllNotices = async function (req, res) {
  try {
    await Notice.findAll()
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
