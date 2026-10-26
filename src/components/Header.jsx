const NAV = [
    { id: 'analyze', label: 'Analyze Audio' },
    { id: 'recordings', label: 'Past Recordings' },
    { id: 'how', label: 'How It Works' },
]

export default function Header({ page, onNavigate, dark, onToggleTheme }) {
    return (
        <header className="fixed top-0 z-50 w-full bg-surface/85 shadow-[0_1px_8px_rgba(0,0,0,0.03)] backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-on-primary shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold tracking-tight">ToneLab</span>
                        <span className="hidden font-mono text-[11px] uppercase tracking-wider text-on-surface-variant sm:inline-block">
                            Voice Mood &amp; Emotion Analyzer
                        </span>
                    </div>
                </div>

                <nav className="hidden items-center gap-0.5 rounded-full bg-surface-container-low p-0.5 md:flex">
                    {NAV.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`rounded-xl px-4 py-1.5 text-sm transition-colors ${page === item.id
                                    ? 'bg-surface-container-high font-medium text-on-surface'
                                    : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <button
                        onClick={onToggleTheme}
                        aria-label="Toggle color scheme"
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {dark ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary">
                        <span className="material-symbols-outlined text-[18px]">person</span>
                    </div>
                </div>
            </div>

            {/* Mobile nav */}
            <nav className="flex items-center gap-0.5 overflow-x-auto border-t border-outline-variant/20 bg-surface-container-low px-4 py-1.5 md:hidden">
                {NAV.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`rounded-xl px-3 py-1.5 text-sm whitespace-nowrap transition-colors ${page === item.id
                                ? 'bg-surface-container-high font-medium text-on-surface'
                                : 'text-on-surface-variant'
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </header>
    )
}