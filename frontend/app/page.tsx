import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white selection:bg-blue-500 selection:text-white">
      
      {/* -------------------- NAVBAR -------------------- */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">A</div>
          <span className="text-xl font-bold tracking-tight">ApiScan</span>
        </div>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="#" className="hover:text-white transition">Features</Link>
          <Link href="#" className="hover:text-white transition">Pricing</Link>
          <Link href="#" className="hover:text-white transition">Docs</Link>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/login" 
            className="text-sm font-medium text-gray-300 hover:text-white py-2"
          >
            Sign In
          </Link>
          <Link 
            href="/dashboard" 
            className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* -------------------- HERO SECTION -------------------- */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        
        {/* Background Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-800 bg-gray-900/50 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-gray-300">v1.0 Public Beta is Live</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            The Autonomous <br />
            <span className="text-blue-500">AI QA Engineer</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop writing manual tests. ApiScan reads your Swagger docs, 
            generates test plans, and hunts for bugs automatically.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Launch Dashboard 🚀
            </Link>
            
            <Link 
              href="https://github.com/your-repo" 
              target="_blank"
              className="px-8 py-4 bg-gray-900 border border-gray-800 hover:border-gray-600 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Star on GitHub
            </Link>
          </div>
        </div>

        {/* -------------------- STATS / TRUST -------------------- */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-gray-800 pt-10 text-center">
          <div>
            <div className="text-3xl font-bold text-white">100+</div>
            <div className="text-sm text-gray-500 mt-1">APIs Scanned</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">0s</div>
            <div className="text-sm text-gray-500 mt-1">Manual Config</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">24/7</div>
            <div className="text-sm text-gray-500 mt-1">Autonomous Check</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-sm text-gray-500 mt-1">Open Source</div>
          </div>
        </div>
      </div>
    </main>
  );
}