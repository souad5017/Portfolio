  import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    date: { type: Date },
    description: { type: String },
    url: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Certificate', certificateSchema);