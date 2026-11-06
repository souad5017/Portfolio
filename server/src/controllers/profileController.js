import Profile from '../models/Profile.js';
import { removeUpload } from '../utils/uploads.js';

const FILE_FIELDS = ['photo', 'cvUrl'];

export const getProfile = async (req, res) => {
  const profile = await Profile.findOne();
  if (!profile) return res.status(404).json({ message: 'Not found' });
  res.json(profile);
};

export const updateProfile = async (req, res) => {
  const before = await Profile.findOne().lean();
  const profile = await Profile.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });

  const replaced = FILE_FIELDS.filter((field) => before?.[field] && before[field] !== profile[field]);
  await Promise.all(replaced.map((field) => removeUpload(before[field])));
  res.json(profile);
};