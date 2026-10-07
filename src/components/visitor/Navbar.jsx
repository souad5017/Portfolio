function Navbar() {
  return (
    <header className="w-full px-6 pt-4 pb-2 mx-auto max-w-[1536px]">
      <nav className="flex items-center justify-between w-full px-5 py-3 border rounded-2xl bg-[#0d121d]/80 backdrop-blur-md border-slate-800/80 shadow-2xl">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-xl bg-gradient-to-br from-sky-400 to-blue-600">
            S
          </div>

          <div className="hidden sm:block text-[13px] tracking-wider">
            <span className="font-bold text-white">SOUAD</span>
            <span className="ml-1 text-slate-400">EL BARJIJI</span>
          </div>
        </a>

        {/* Navigation */}
        <div className="items-center hidden gap-6 xl:flex">
          <a
            href="#home"
            className="text-sm font-medium text-white transition-colors"
          >
            Home
          </a>

          <a
            href="#about"
            className="text-sm font-medium transition-colors text-slate-400 hover:text-white"
          >
            About
          </a>

          <a
            href="#skills"
            className="text-sm font-medium transition-colors text-slate-400 hover:text-white"
          >
            Skills
          </a>

          <a
            href="#projects"
            className="text-sm font-medium transition-colors text-slate-400 hover:text-white"
          >
            Projects
          </a>

          <a
            href="#experience"
            className="text-sm font-medium transition-colors text-slate-400 hover:text-white"
          >
            Experience
          </a>

          <a
            href="#education"
            className="text-sm font-medium transition-colors text-slate-400 hover:text-white"
          >
            Education
          </a>

          <a
            href="#certificates"
            className="text-sm font-medium transition-colors text-slate-400 hover:text-white"
          >
            Certificates
          </a>

          <a
            href="#cv"
            className="text-sm font-medium transition-colors text-slate-400 hover:text-white"
          >
            CV
          </a>

          <a
            href="#contact"
            className="text-sm font-medium transition-colors text-slate-400 hover:text-white"
          >
            Contact
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">

          {/* GitHub */}
          <a
            href="#"
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            GitHub
          </a>

          {/* LinkedIn */}
          <a
            href="#"
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>

          <div className="h-6 border-r border-slate-700" />

          {/* Theme toggle */}
          <div className="flex items-center p-1 border rounded-full border-slate-700 bg-slate-900/80">
            <button
              className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-indigo-600/80"
              aria-label="Dark mode"
            >
              🌙
            </button>

            <button
              className="flex items-center justify-center w-8 h-8 text-slate-500"
              aria-label="Light mode"
            >
              ☀️
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar