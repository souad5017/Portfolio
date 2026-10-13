import mongoose from 'mongoose';
const educationSchema = new mongoose.Schema(
    {
        school: { type: String, required: true, trim: true },
        degree: { type: String, required: true, trim: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model('Education', educationSchema);