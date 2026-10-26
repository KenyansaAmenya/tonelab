export default function Footer() {
    return (
        <footer className="mt-12 w-full bg-surface-container-low">
            <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
                <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-center gap-1 md:justify-start">
                            <span className="material-symbols-outlined text-[18px] text-primary">
                                sound_detection_dog_barking
                            </span>
                            <span className="text-lg font-semibold">ToneLab</span>
                        </div>
                        <p className="max-w-sm text-sm text-on-surface-variant">
                            Acoustic timbre, emotional cadence, and speech tone intelligence
                            engineered with artisanal studio precision.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-on-surface-variant">
                        <span className="cursor-pointer hover:text-on-surface">Privacy Notice</span>
                        <span className="cursor-pointer hover:text-on-surface">Terms of Service</span>
                        <span className="cursor-pointer hover:text-on-surface">Audio Ethics</span>
                        <span className="cursor-pointer hover:text-on-surface">Support</span>
                    </div>
                </div>
                <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-outline-variant/30 pt-4 font-mono text-[11px] text-on-surface-variant sm:flex-row">
                    <p>© 2026 ToneLab Research Systems. Designed by Felix Amenya.</p>
                    <p className="text-tertiary">v2.4.1 Studio Telemetry Build</p>
                </div>
            </div>
        </footer>
    )
}