const express = require('express');
const router = express.Router();

const {
	category,
	uploadPicture,
	getAllPictures,
	getPicture,
	getPictureByCategory,
	getCategories
} = require('../controllers/gallery');

// router param
router.param('categoryid', getPictureByCategory);

// creating category
router.post('/category/create', category);

// upload picture route
router.post('/upload/picture', uploadPicture);

// get all pictures
router.get('/pictures', getAllPictures);

// get all categories
router.get('/categories', getCategories);

// get picture by id
router.get('/picture/:categoryid', getPicture);

module.exports = router;
