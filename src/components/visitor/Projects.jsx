const projects = [
  {
    id: 1,
    title: "EasyColoc",
    category: "FULL-STACK APPLICATION",
    description:
      "A web application for managing shared housing, roommates and daily organization.",
    technologies: ["React", "Node.js", "MySQL"],
    image: "",
  },
  {
    id: 2,
    title: "Personal Wallet",
    category: "FINANCE APPLICATION",
    description:
      "A web application for managing personal finances, expenses and financial activities.",
    technologies: ["React", "Node.js", "MySQL"],
    image: "",
  },
  {
    id: 3,
    title: "JobFix",
    category: "JOB PLATFORM",
    description:
      "A web platform for discovering job opportunities, filtering offers and managing applications.",
    technologies: ["EJS", "Express", "MySQL"],
    image: "",
  },
  {
    id: 4,
    title: "Qodex Student Quiz",
    category: "EDUCATIONAL PLATFORM",
    description:
      "An interactive quiz platform designed to help students test and improve their knowledge.",
    technologies: ["React", "Node.js", "MongoDB"],
    image: "",
  },
  {
    id: 5,
    title: "RestaurantAI-Brigade API",
    category: "REST API",
    description:
      "A backend API for managing restaurant data, resources and application operations.",
    technologies: ["Node.js", "Express", "MongoDB"],
    image: "",
  },
]

function Projects() {
  return (
    <main
      id="projects"
      className="w-full max-w-7xl px-6 py-16 mx-auto md:py-20 lg:py-24"
    >
      {/* Section Header */}
      <header className="mb-14 md:mb-16">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-cyan-400 uppercase">
            03 / SELECTED WORK
          </span>
        </div>

        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl leading-[1.08]">
          Ideas, designed and engineered.
        </h1>

        <p className="max-w-2xl mt-6 text-base leading-relaxed md:text-lg text-slate-400">
          A selection of projects exploring product thinking, interface craft,
          and full-stack development.
        </p>
      </header>

      {/* Projects Grid */}
      <section
        aria-label="Portfolio Projects"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <article
            key={project.id}
            className="overflow-hidden transition-all duration-500 border rounded-2xl group bg-[#080d19] border-slate-800/80 hover:border-cyan-500/40 hover:-translate-y-1"
          >
            {/* Project Image */}
            <div className="relative p-2 overflow-hidden">
              <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-[#0d1527]">

                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} project`}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-5xl font-extrabold text-slate-800">
                      S
                    </span>
                  </div>
                )}

                {/* Gradient */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/50 via-transparent to-transparent" />

                {/* Number */}
                <span className="absolute bottom-3 left-3 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-slate-300 bg-black/60 backdrop-blur-md rounded-md border border-white/10">
                  {String(project.id).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 pt-3">

              {/* Category */}
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase">
                {project.category}
              </span>

              {/* Title */}
              <h2 className="mt-2 mb-3 text-2xl font-bold tracking-tight text-white">
                {project.title}
              </h2>

              {/* Description */}
              <p className="mb-5 text-sm leading-relaxed text-slate-400 line-clamp-3">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="px-3 py-1 text-[11px] font-medium rounded-full bg-[#0d1527] text-slate-300 border border-slate-700/60"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-cyan-400"
                >
                  View project
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Open ${project.title} preview`}
                    className="flex items-center justify-center w-8 h-8 transition-colors border rounded-lg border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-600"
                  >
                    ↗
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Projects