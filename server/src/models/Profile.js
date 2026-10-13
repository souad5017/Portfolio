  import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    about: { type: String },
    location: { type: String, trim: true },
    email: { type: String, trim: true },
    github: { type: String },
    linkedin: { type: String },
    cvUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);