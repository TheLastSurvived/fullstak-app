const mongoose = require('mongoose');

const Usern = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  roles: [
    {
      ref: 'Role',
      type: String,
    }
  ],
})

module.exports = mongoose.model('Usern', Usern)