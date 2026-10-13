import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
    {
        position: { type: String, required: true, trim: true },
        company: { type: String, required: true, trim: true },
        location: { type: String, trim: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String },
        missions: [String],
    },
    { timestamps: true }
);

export default mongoose.model('Experience', experienceSchema);