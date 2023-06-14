const mongoose = require('mongoose');

const Template = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  imageFileName: {
    type: String,
  },
  data: mongoose.Schema.Types.Mixed,
  author: {
    required: true,
    ref: 'Usern',
    type: String,
  },
  isPublished: {
    required: true,
    default: false,
    type: Boolean,
  },
})

module.exports = mongoose.model('Template', Template)