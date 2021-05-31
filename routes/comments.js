const express = require('express');
const router = express.Router({mergeParams:true});

const Manga = require('../models/mangas');
const Comment = require('../models/comments');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const {validateComment,isLoggedIn,isCommentOwner} = require('../middleware');

const comments = require('../controllers/comments')

router.post('/',isLoggedIn,validateComment,catchAsync(comments.createComment))

router.delete('/:commentId',isLoggedIn,isCommentOwner,catchAsync(comments.destroyComment))

module.exports = router;