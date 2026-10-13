  import mongoose from 'mongoose';

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
        startDate: { type: Date },
        endDate: { type: Date },
        published: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model('Project', projectSchema);