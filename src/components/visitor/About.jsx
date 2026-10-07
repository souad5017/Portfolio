function About() {
  return (
    <main
      id="about"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-24"
    >
      {/* Section Identifier */}
      <div className="flex items-center mb-8 space-x-2 text-xs font-bold tracking-widest text-sky-400 uppercase">
        <span>01 / ABOUT</span>
      </div>

      {/* Title */}
      <section className="mb-14 sm:mb-20">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold text-white tracking-tight leading-[1.08]">
          Curious by nature.
          <br />
          Precise by practice.
        </h1>
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-start">

        {/* Biography */}
        <article className="flex flex-col justify-between space-y-9 lg:col-span-6 lg:pr-4">
          <div>
            <h2 className="mb-7 text-2xl sm:text-3xl md:text-[2rem] font-bold text-white leading-snug tracking-tight">
              I'm a full-stack developer focused on crafting digital
              products that feel{" "}
              <span className="font-bold text-sky-400">
                clear, capable, and human.
              </span>
            </h2>

            <p className="max-w-xl text-sm font-normal leading-relaxed sm:text-base text-slate-400">
              From the first wireframe to the final API endpoint, I enjoy
              connecting design thinking with strong technical foundations.
              My goal is simple: create useful products people genuinely
              enjoy using.
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center pt-6 space-x-4 text-xs font-mono tracking-wider">
            <span className="font-semibold text-slate-500">
              34.0209° N
            </span>

            <span className="inline-block w-10 h-0.5 rounded-full bg-blue-600/70" />

            <span className="font-bold tracking-widest text-slate-300">
              MOROCCO
            </span>
          </div>
        </article>

        {/* Metrics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">

          {/* Card 1 */}
          <div className="metric-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[175px] relative group hover:border-slate-700/80 transition-all duration-300">
            <div className="flex justify-end">
              <span className="font-mono text-[11px] text-slate-500">
                01
              </span>
            </div>

            <div className="mt-4">
              <div className="mb-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                3+
              </div>

              <div className="text-xs font-medium text-slate-400">
                Years learning & building
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="metric-card-alt rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[175px] relative group hover:border-slate-700/80 transition-all duration-300">
            <div className="flex justify-end">
              <span className="font-mono text-[11px] text-slate-400/80">
                02
              </span>
            </div>

            <div className="mt-4">
              <div className="mb-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                12+
              </div>

              <div className="text-xs font-medium text-slate-300">
                Projects brought to life
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="metric-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-[175px] relative group hover:border-slate-700/80 transition-all duration-300">
            <div className="flex justify-end">
              <span className="font-mono text-[11px] text-slate-500">
                03
              </span>
            </div>

            <div className="mt-4">
              <div className="mb-3 text-4xl font-light leading-none tracking-tight text-white sm:text-5xl">
                ∞
              </div>

              <div className="text-xs font-medium text-slate-400">
                Curiosity for what's next
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative flex flex-col justify-center min-h-[175px] p-6 sm:p-7 rounded-2xl">
            <div className="mb-3">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-rose-500 uppercase">
                CURRENT FOCUS
              </span>
            </div>

            <p className="text-base font-bold leading-snug text-white sm:text-lg">
              Scalable React architectures & thoughtful product design.
            </p>
          </div>

        </div>
      </section>
    </main>
  )
}

export default About