const mongoose = require('mongoose');

const Tokenn = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usern',
  },
  refreshToken: {
    required: true,
    type: String,
  },
})

module.exports = mongoose.model('Tokenn', Tokenn)