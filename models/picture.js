const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
mongoose.set('debug', true);

const pictureSchema = new mongoose.Schema(
	{
		picture: {
			data: Buffer,
			contentType: String,
			name: String,
		},
		category: {
			type: ObjectId,
			ref: 'Category'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Picture', pictureSchema);
