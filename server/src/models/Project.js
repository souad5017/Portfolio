const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, trim: true },
    description: { type: String, required: true },
    details: { type: String },
    features: [String],
    image: { type: String },
    technologies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Technology' }],
    github: { type: String },
    demo: { type: String },
    date: { type: Date },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);