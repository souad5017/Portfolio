function Hero() {
  return (
    <main className="relative w-full max-w-[1536px] mx-auto px-8 lg:px-12 pt-8 pb-16">

      {/* Ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 glow-cyan pointer-events-none rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 glow-purple pointer-events-none rounded-full blur-3xl" />

      <div className="relative grid items-center grid-cols-1 gap-8 lg:grid-cols-12 min-h-[580px]">

        {/* Left content */}
        <div className="z-10 lg:col-span-7">

          {/* Availability */}
          <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 text-xs border rounded-full bg-slate-900/60 border-slate-800 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

            <span className="font-medium tracking-wider">
              AVAILABLE FOR OPPORTUNITIES
            </span>

            <span className="text-slate-600">|</span>

            <span className="font-mono text-slate-400">
              2026
            </span>
          </div>

          {/* Heading */}
          <p className="mb-2 text-lg font-medium text-sky-400">
            Hello, I'm
          </p>

          <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Souad
          </h1>

          <div className="relative inline-block mt-1">
            {/* Decorative dots */}
            <div className="absolute flex gap-2 -top-2 left-1/2 -translate-x-1/2">
              <span className="w-1 h-1 rounded-full bg-sky-400" />
              <span className="w-1 h-1 rounded-full bg-indigo-400" />
              <span className="w-1 h-1 rounded-full bg-purple-400" />
              <span className="w-1 h-1 rounded-full bg-sky-400" />
            </div>

            <h2 className="text-6xl font-extrabold tracking-tight stroke-text sm:text-7xl lg:text-8xl">
              El Barjiji.
            </h2>
          </div>

          {/* Role */}
          <div className="flex items-center gap-4 mt-6">
            <span className="text-lg font-semibold text-slate-200 sm:text-xl">
              Full Stack Web Developer
            </span>

            <div className="hidden w-20 h-px sm:block bg-gradient-to-r from-sky-400 to-transparent" />
          </div>

          {/* Description */}
          <p className="max-w-2xl mt-6 text-base leading-7 text-slate-400 sm:text-lg">
            I build modern, responsive and user-focused web applications —
            where thoughtful design meets reliable engineering.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 mt-8">

            <a
              href="#projects"
              className="inline-flex items-center gap-3 px-6 py-3 font-semibold text-white transition-all rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20"
            >
              View my projects
              <span>→</span>
            </a>

            <a
              href="#cv"
              className="inline-flex items-center gap-3 px-6 py-3 font-semibold transition-all border rounded-xl border-slate-700 bg-slate-900/60 text-slate-200 hover:border-slate-500 hover:text-white"
            >
              Download CV
              <span>↓</span>
            </a>

          </div>

          {/* Social / Scroll */}
          <div className="flex flex-wrap items-center gap-8 mt-14">

            <div>
              <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-slate-600">
                SCROLL TO EXPLORE
              </p>

              <div className="w-20 h-px bg-slate-800" />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500">
                Find me on
              </span>

              <a
                href="#"
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                GitHub
              </a>

              <a
                href="#"
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                LinkedIn
              </a>
            </div>

          </div>
        </div>

        {/* Right visual */}
        <div className="relative flex items-center justify-center lg:col-span-5">

          {/* Vertical label */}
          <div className="absolute right-0 hidden font-mono text-[10px] tracking-[0.3em] text-slate-600 lg:block [writing-mode:vertical-rl]">
            S / 01
          </div>

          {/* Arch */}
          <div className="relative w-full max-w-[420px] h-[510px] rounded-t-[210px] rounded-b-[36px] bg-gradient-to-b from-[#111726]/80 via-[#0c101c]/90 to-[#090d16] border border-slate-800/80 p-5 overflow-hidden shadow-2xl">

            {/* Glows */}
            <div className="absolute w-64 h-64 rounded-full -top-20 -right-20 glow-cyan blur-3xl" />
            <div className="absolute w-64 h-64 rounded-full -bottom-20 -left-20 glow-purple blur-3xl" />

            {/* Circular wire */}
            <div className="absolute w-[360px] h-[360px] border border-slate-700/40 rounded-full top-[55px] left-1/2 -translate-x-1/2" />

            {/* Top code */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 border rounded-lg border-slate-700/60 bg-[#080a10]/80 backdrop-blur-md">
              <span className="font-mono text-[11px] text-slate-400">
                <span className="text-sky-400">01</span>{" "}
                const craft ={" "}
                <span className="text-purple-400">
                  "intentional"
                </span>
                ;
              </span>
            </div>

            {/* S monogram */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[260px] font-extrabold leading-none text-transparent select-none bg-gradient-to-b from-slate-700/40 to-slate-900/20 bg-clip-text">
                S
              </span>
            </div>

            {/* Bottom code */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 border rounded-lg border-slate-700/60 bg-[#080a10]/80 backdrop-blur-md whitespace-nowrap">
              <span className="font-mono text-[11px] text-slate-400">
                <span className="text-sky-400">&lt;/&gt;</span>{" "}
                design → build → refine
              </span>
            </div>

            {/* Location */}
            <div className="absolute bottom-6 left-6">
              <p className="font-mono text-[9px] tracking-[0.2em] text-slate-600">
                BASED IN
              </p>

              <div className="flex items-end gap-2 mt-1">
                <span className="text-sm font-semibold text-slate-300">
                  Morocco
                </span>

                <span className="font-mono text-xs text-sky-400">
                  MA
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

export default Hero