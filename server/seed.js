import 'dotenv/config';
import bcrypt from 'bcrypt';
import connectDB from './src/config/db.js';
import User from './src/models/User.js';
import Profile from './src/models/Profile.js';
import Technology from './src/models/Technology.js';
import Skill from './src/models/Skill.js';
import Project from './src/models/Project.js';
import Experience from './src/models/Experience.js';
import Education from './src/models/Education.js';
import Certificate from './src/models/Certificate.js';
import Message from './src/models/Message.js';

const profileData = {
    firstName: 'Souad',
    lastName: 'El Barjiji',
    role: 'Junior Full Stack Web Developer',
    intro:
        'Junior Full Stack Web Developer studying at YouCode – UM6P, focused on building dynamic web applications.',
    about:
        'I completed an internship at Highness, working on a real-time messaging SaaS platform. I am serious, independent, and solution-oriented, and I am looking for an opportunity to contribute to a team while continuing to grow. Languages: Arabic (native), French (beginner), and English (beginner). Strengths: analytical thinking, autonomy, teamwork, time management, and problem-solving. Interests: drawing and visual creativity, personal development, problem-solving, and discovering new technologies.',
    summary:
        'Experience with React, JavaScript, PHP/Laravel, Node.js/Express, MySQL, MongoDB, Redis, REST APIs, and Git/GitHub.',
    goals: 'Seeking a junior web development position.',
    location: 'Nador, Morocco',
    email: 'souadelbarjiji@gmail.com',
    phone: '+212 713-775017', // Verify the digits before publishing.
    github: 'https://github.com/souad5017',
    linkedin: 'https://www.linkedin.com/in/souad-el-barjiji-79533138a/',
    cvUrl: null, // Add a public CV file before setting this URL.
};

const technologiesByCategory = {
    Frontend: [
        'HTML5',
        'CSS3',
        'JavaScript',
        'React',
        'Tailwind CSS',
        'Blade',
        'jQuery',
        'AJAX',
        'EJS',
        'DOM',
        'Vite',
        'React Router',
        'Axios',
        'LocalStorage',
        'Twig',
    ],
    Backend: [
        'PHP (OOP)',
        'Laravel',
        'Node.js',
        'Express.js',
        'REST API',
        'JWT',
        'Laravel Reverb',
        'bcrypt',
        'Multer',
        'PDO',
    ],
    Database: ['MySQL', 'SQL', 'MongoDB', 'Mongoose', 'Redis'],
    Tools: [
        'Git',
        'GitHub',
        'VS Code',
        'Docker',
        'Docker Compose',
        'Jira',
        'Postman',
        'Apidog',
        'Jest',
        'Supertest',
        'Swagger UI',
        'UML',
        'Composer',
    ],
};

const skillsByCategory = {
    Frontend: technologiesByCategory.Frontend,
    Backend: [
        ...technologiesByCategory.Backend,
        'CRUD',
        'MVC',
        'Middleware',
        'Input validation',
        'CSRF and XSS protection',
    ],
    Database: [
        ...technologiesByCategory.Database,
        'Eloquent ORM',
        'Database migrations',
        'Prepared SQL queries',
    ],
    Tools: [
        ...technologiesByCategory.Tools,
        'Unit testing',
        'Integration testing',
        'API testing',
        'End-to-end testing',
    ],
};

// Labeled placeholders are used because the repositories do not provide
// project screenshots in the portfolio assets.
const projectImage = (label, color) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
      <rect width="1200" height="800" fill="${color}"/>
      <text x="600" y="400" text-anchor="middle" dominant-baseline="middle"
        fill="#ffffff" font-family="Arial, sans-serif" font-size="64">${label}</text>
    </svg>`;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const projects = [
    {
        title: 'LSM Backend – Learning Management System',
        type: 'Learning platform API',
        description:
            'Backend API for a learning management platform, covering courses and learner workflows.',
        details:
            'The public GitHub repository is a fork. Its documentation describes learner, trainer, and administrator roles; course enrollment and progression; learning resources; quizzes and attempts; trainer statistics; and feedback.',
        features: [
            'JWT authentication and role-based access.',
            'Course, module, resource, and enrollment management.',
            'Learner progress tracking, quizzes, and quiz attempts.',
            'Jest and Supertest, Docker Compose, and Swagger documentation.',
        ],
        image: projectImage('LSM Backend', '#39206d'),
        github: 'https://github.com/souad5017/LSM-Backend',
        demo: null,
        technologyNames: [
            'Node.js',
            'Express.js',
            'MongoDB',
            'Mongoose',
            'JWT',
            'Jest',
            'Supertest',
            'Docker Compose',
            'Swagger UI',
        ],
    },
    {
        title: 'JobFix',
        type: 'Web application · PHP/Laravel',
        description:
            'A platform connecting clients with service professionals.',
        details:
            'As described in the CV, the project handles accounts and profiles, image uploads, service requests, and appointment scheduling.',
        features: [
            'Account and profile management.',
            'Image uploads.',
            'Service request management and appointment scheduling.',
        ],
        image: projectImage('JobFix', '#174c54'),
        github: 'https://github.com/souad5017/JobFix',
        demo: null,
        technologyNames: ['PHP (OOP)', 'Laravel', 'Blade', 'MySQL'],
    },
    {
        title: 'Qodex Student Quiz',
        type: 'Educational web application',
        description:
            'An online educational quiz platform with categories and score tracking.',
        details:
            'As described in the CV, learners can take quizzes by category, view calculated scores, and review their results history.',
        features: [
            'Secure authentication and role management.',
            'Category-based quizzes, score calculation, and results history.',
            'Prepared queries, input validation, and CSRF protection.',
        ],
        image: projectImage('Qodex Quiz', '#59412c'),
        github: 'https://github.com/souad5017/qodex_student_quiz',
        demo: null,
        technologyNames: ['PHP (OOP)', 'MySQL', 'HTML5', 'JavaScript', 'Git'],
    },
    {
        title: 'Job Board – Internships and Work-Study Offers',
        type: 'Internship portal · Node.js',
        description:
            'A portal for browsing and following internship and work-study offers.',
        details:
            'The repository documents keyword search, combined filters by city, technology, and contract type, sorting by publication date, saved offers using LocalStorage, and an administration interface for managing offers.',
        features: [
            'Search, combined filters, and offer sorting.',
            'Offer listing, detail, and saved-offer pages.',
            'Administration tools to add, update, and delete offers.',
            'Prepared MySQL queries and a responsive interface.',
        ],
        image: projectImage('Job Board', '#253e70'),
        github: 'https://github.com/souad5017/job-board',
        demo: null,
        technologyNames: [
            'Node.js',
            'Express.js',
            'EJS',
            'MySQL',
            'JavaScript',
            'HTML5',
            'CSS3',
            'LocalStorage',
            'Git',
        ],
    },
    {
        title: 'Memory Card Game',
        type: 'Browser game · JavaScript',
        description:
            'An interactive memory game built with HTML, CSS, and JavaScript.',
        details:
            'The GitHub repository also contains a set of ten progressive JavaScript exercises. The game includes shuffled cards and multiple difficulty levels.',
        features: [
            'Player name and difficulty selection.',
            'Move, matched-pair, and timer counters.',
            'Win or loss messages and a restart button.',
        ],
        image: projectImage('Memory Card Game', '#81434d'),
        github: 'https://github.com/souad5017/warmup-javascript',
        demo: null,
        technologyNames: ['HTML5', 'CSS3', 'JavaScript', 'DOM', 'Git', 'GitHub'],
    },
    {
        title: 'Minimal PHP MVC Framework',
        type: 'PHP framework · MVC',
        description:
            'A lightweight PHP MVC framework built to practice modern software architecture fundamentals.',
        details:
            'The repository documents a reusable framework with separated controllers, models, and views; dynamic routing; database access through PDO; form validation; sessions; and security protections.',
        features: [
            'Dynamic routing and organized controllers.',
            'Database access through PDO.',
            'Form validation and session management.',
            'CSRF protection, XSS escaping, and password hashing.',
            'Twig template integration.',
        ],
        image: projectImage('PHP MVC Framework', '#814f28'),
        github: 'https://github.com/souad5017/Job-Dating',
        demo: null,
        technologyNames: ['PHP (OOP)', 'PDO', 'Twig', 'Composer'],
    },
];

const experienceData = {
    position: 'Web Development Intern',
    company: 'Highness',
    location: 'Kenitra, Morocco',
    startDate: new Date('2026-05-11'),
    endDate: new Date('2026-08-21'),
    description: 'Internship on a real-time messaging SaaS platform.',
    missions: [
        'Developed authentication, profile management, and workspaces.',
        'Contributed to the offline contact form and discussion widget customization.',
        'Integrated real-time features and fixed bugs.',
    ],
};

const educationData = [
    {
        school: 'YouCode Nador, UM6P',
        degree: 'Full Stack Web Development',
        startDate: new Date('2025-01-01'), // The CV gives the year only.
        endDate: new Date('2027-01-01'),
        description: 'Currently studying.',
    },
    {
        school: 'Lycée Technique Al Matar, Nador',
        degree: 'Baccalaureate in Literature',
        startDate: new Date('2024-01-01'), // The CV gives the year only.
        endDate: new Date('2025-01-01'),
    },
];

const seed = async () => {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Refusing to reset the database in production.');
    }

    if (process.env.ALLOW_SEED_RESET !== 'true') {
        throw new Error('Set ALLOW_SEED_RESET=true in .env to clear all collections.');
    }

    const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    }

    await connectDB();

    // This clears every collection managed by the seed, including users and messages.
    await Promise.all(
        [
            User,
            Profile,
            Technology,
            Skill,
            Project,
            Experience,
            Education,
            Certificate,
            Message,
        ].map((model) => model.deleteMany({}))
    );

    await User.create({
        email: ADMIN_EMAIL,
        password: await bcrypt.hash(ADMIN_PASSWORD, 10),
    });

    await Profile.create(profileData);

    const technologyDocuments = await Technology.insertMany(
        Object.entries(technologiesByCategory).flatMap(([category, names]) =>
            names.map((name) => ({ name, category }))
        )
    );

    const technologyByName = new Map(
        technologyDocuments.map((technology) => [technology.name, technology])
    );

    const skillDocuments = Object.entries(skillsByCategory).flatMap(
        ([category, names]) =>
            names.map((name, order) => ({
                name,
                category,
                level: null,
                order,
            }))
    );

    await Skill.insertMany(skillDocuments);

    await Project.insertMany(
        projects.map(({ technologyNames, ...project }) => ({
            ...project,
            technologies: technologyNames.map((name) => {
                const technology = technologyByName.get(name);
                if (!technology) {
                    throw new Error(`Missing technology in seed: ${name}`);
                }
                return technology._id;
            }),
            published: true,
        }))
    );

    await Experience.create(experienceData);
    await Education.insertMany(educationData);
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