const formidable = require('formidable');
const fs = require('fs');

const PictureSchema = require('../models/picture');
const Category = require('../models/category');

// param
exports.getPictureByCategory = (req, res, next, id) => {
	console.log(id)
	PictureSchema.find({ category: id }).exec((error, picture) => {
		if (error) {
			return res.status(400).json({
				error: 'Could not find any picture'
			});
		}

		req.picture = picture;

		next();
	});
};

// creating category
exports.category = (req, res) => {
	let category = new Category(req.body);

	category.save((error, cate) => {
		if (error) {
			return res.status(400).json({
				error: 'Unable to create category'
			});
		}

		res.json(cate);
	});
};

// uploading picture
exports.uploadPicture = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
	
	console.log('working')

	form.parse(req, (error, fields, files) => {
		if (error) {
			return res.status(400).json({
				error: 'Something went wrong in this case'
			});
		}

		console.log(error, files, fields)

		let pictureSchema = new PictureSchema(fields);

		pictureSchema.picture.data = fs.readFileSync(files.picture.path);
		pictureSchema.picture.contentType = files.picture.type;
		pictureSchema.picture.name = files.picture.name;

		pictureSchema.save((error, picture) => {
			if (error) {
				return res.status(400).json({
					error: 'Could not upload the picture'
				});
			}

			res.json(picture);
		});
	});
};

// get all pictures
exports.getAllPictures = (req, res) => {
	PictureSchema.find().exec((error, pictures) => {
		if (error) {
			return res.status(400).json({
				error: 'Could not fetch any product'
			});
		}

		res.json(pictures);
	});
};

// get pictures on category
exports.getPicture = (req, res) => {
	if(req.picture == null){
		return res.json({
			error: 'No picture on this category'
		})
	} else {
		return res.json(req.picture);
	}
};

// get all categories
exports.getCategories = (req, res) => {
	Category.find().exec((error, categories) => {
		if (error) {
			return res.status(400).json({
				error: 'Could not fetch any product'
			});
		}

		res.json(categories);
	});
};
