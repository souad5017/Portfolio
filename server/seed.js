require('dotenv').config();
const bcrypt = require('bcrypt');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');
const Profile = require('./src/models/Profile');
const Technology = require('./src/models/Technology');
const Project = require('./src/models/Project');
const Experience = require('./src/models/Experience');
const Education = require('./src/models/Education');
const Certificate = require('./src/models/Certificate');
const Message = require('./src/models/Message');
const Skill = require('./src/models/Skill');

const technologiesByCategory = {
    Frontend: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS'],
    Backend: ['Node.js', 'Express.js', 'REST API'],
    Database: ['MongoDB', 'Mongoose'],
    Tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Jira'],
};

const details =
    'The project began with a simple challenge: create a product that makes a complicated workflow feel natural. I mapped the core user journey, built a scalable visual language, and developed each flow with speed and accessibility in mind.';

const features = [
    'Responsive component system',
    'Secure authentication workflow',
    'Real-time data interactions',
    'Accessible, mobile-first interface',
];

const seed = async () => {
    const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    }

    await connectDB();
    await Promise.all(
        [User, Profile, Technology, Skill, Project, Experience, Education, Certificate, Message].map((model) => model.deleteMany())
    );

    await User.create({ email: ADMIN_EMAIL, password: await bcrypt.hash(ADMIN_PASSWORD, 10) });

    await Profile.create({
        firstName: 'Souad',
        lastName: 'El Barjiji',
        role: 'Full Stack Web Developer',
        about:
            "I'm a full-stack developer focused on crafting digital products that feel clear, capable, and human.",
        location: 'Morocco',
        email: 'souad@example.com',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        cvUrl: '/Souad-El-Barjiji-CV.pdf',
    });

    const technologies = await Technology.insertMany(
        Object.entries(technologiesByCategory).flatMap(([category, names]) =>
            names.map((name) => ({ name, category }))
        )
    );
    const ids = (names) =>
        names.map((name) => technologies.find((tech) => tech.name === name)._id);

    await Skill.insertMany(
        Object.entries(technologiesByCategory).flatMap(([category, names]) =>
            names.map((name, order) => ({ name, category, level: 'Advanced', order }))
        )
    );

    await Project.insertMany([
        {
            title: 'Nexa Commerce',
            type: 'Full-stack platform',
            description: 'A refined commerce experience that turns complex inventory, checkout, and order flows into one effortless customer journey.',
            details,
            features,
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85',
            technologies: ids(['React', 'Node.js', 'MongoDB']),
            github: 'https://github.com',
            demo: '#',
            date: new Date('2026-01-01'),
        },
        {
            title: 'Taskflow',
            type: 'Productivity system',
            description: 'A collaborative workspace for creative teams to plan sprints, share progress, and move ambitious work forward.',
            details,
            features,
            image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1400&q=85',
            technologies: ids(['JavaScript', 'Express.js', 'REST API']),
            github: 'https://github.com',
            demo: '#',
            date: new Date('2025-09-01'),
        },
        {
            title: 'Atlas Journal',
            type: 'Editorial platform',
            description: 'A story-led travel journal with an elegant publishing workflow and immersive, responsive reading experience.',
            details,
            features,
            image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=85',
            technologies: ids(['Node.js', 'Express.js', 'MongoDB']),
            github: 'https://github.com',
            demo: '#',
            date: new Date('2025-05-01'),
        },
    ]);

    await Experience.insertMany([
        {
            position: 'Full Stack Web Developer',
            company: 'Independent',
            location: 'Morocco',
            startDate: new Date('2025-01-01'),
            description: 'Designing and delivering responsive web applications from interface architecture to database integration.',
            missions: [
                'Build reusable React interfaces',
                'Develop RESTful APIs and database schemas',
                'Translate product goals into polished experiences',
            ],
        },
        {
            position: 'Web Development Intern',
            company: 'Digital Studio',
            location: 'Casablanca',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2025-01-01'),
            description: 'Collaborated with a multidisciplinary team to build, test, and improve production-ready web experiences.',
            missions: [
                'Implemented responsive UI features',
                'Integrated APIs and tested endpoints',
                'Participated in agile delivery cycles',
            ],
        },
    ]);

    await Education.insertMany([
        {
            school: 'OFPPT',
            degree: 'Specialized Technician Diploma — Digital Development, Full Stack',
            startDate: new Date('2023-09-01'),
            endDate: new Date('2025-07-01'),
            description: 'Intensive training in web engineering, data modeling, agile methods, and end-to-end application development.',
        },
        {
            school: 'Computer Science Foundations',
            degree: 'Core programming, algorithms, and systems concepts',
            startDate: new Date('2022-09-01'),
            endDate: new Date('2023-07-01'),
        },
    ]);

    await Certificate.insertMany([
        { name: 'Responsive Web Design', issuer: 'freeCodeCamp', date: new Date('2025-01-01'), description: 'Modern responsive layouts, accessibility, and interface fundamentals.' },
        { name: 'JavaScript Algorithms', issuer: 'freeCodeCamp', date: new Date('2025-06-01'), description: 'Data structures, algorithmic thinking, and modern JavaScript.' },
        { name: 'React Development', issuer: 'Meta', date: new Date('2026-01-01'), description: 'Component architecture, state, testing, and production patterns.' },
    ]);
};

seed()
    .then(() => {
        console.log('Database seeded');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Seed failed:', err.message);
        process.exit(1);
    });