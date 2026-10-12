const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ['Frontend', 'Backend', 'Database', 'Tools'] },
    level: { type: Number, min: 0, max: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Technology', technologySchema);