import Project from '../models/Project.js';
import Technology from '../models/Technology.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Certificate from '../models/Certificate.js';
import Message from '../models/Message.js';

export const getStats = async (req, res) => {
  const [projects, technologies, skills, experiences, education, certificates, messages, unreadMessages] =
    await Promise.all([
      Project.countDocuments(),
      Technology.countDocuments(),
      Skill.countDocuments(),
      Experience.countDocuments(),
      Education.countDocuments(),
      Certificate.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ isRead: false }),
    ]);

  res.json({ projects, technologies, skills, experiences, education, certificates, messages, unreadMessages });
};