import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        category: { type: String, required: true, enum: ['Frontend', 'Backend', 'Database', 'Tools'] },
    },
    { timestamps: true }
);

export default mongoose.model('Technology', technologySchema);