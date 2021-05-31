const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const {isLoggedIn,validateManga,isUploader} = require('../middleware');
const mangas = require('../controllers/mangas');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

router.route('/')
    .get(catchAsync(mangas.index))
    .post(isLoggedIn,upload.array('image'),validateManga,catchAsync(mangas.createManga));

router.get('/new',isLoggedIn,mangas.renderNewManga);

router.route('/:id')
    .get(catchAsync(mangas.showManga))
    .put(isLoggedIn,isUploader,upload.array('image'),validateManga,catchAsync(mangas.updateManga))
    .delete(isLoggedIn,isUploader,catchAsync(mangas.destroyManga));

router.get('/:id/edit',isLoggedIn,isUploader,catchAsync(mangas.renderEditManga));


module.exports = router;