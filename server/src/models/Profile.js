import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    intro: { type: String },
    about: { type: String },
    summary: { type: String },
    goals: { type: String },
    location: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    github: { type: String },
    linkedin: { type: String },
    website: { type: String },
    photo: { type: String },
    cvUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);