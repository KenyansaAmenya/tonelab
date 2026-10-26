import { useEffect, useRef, useState } from 'react'

const DEFAULT_BARS = [
    20, 35, 50, 70, 85, 95, 90, 75, 60, 40, 25, 45, 75, 92, 100, 85, 65, 40, 20,
    30, 55, 78, 85, 65, 45, 30, 22, 35, 55, 70, 60, 40, 25,
]

function fmt(s) {
    const m = Math.floor(s / 60)
    const sec = (s % 60).toFixed(1).padStart(4, '0')
    return `${String(m).padStart(2, '0')}:${sec}`
}

export default function Waveform({
    total = 3.9,
    bars = DEFAULT_BARS,
    pitchLabel = 'Pitch: 224 Hz • Melodic Warmth',
    trackLabel = 'Active Track: Upbeat_Morning_Voice.wav',
    heightClass = 'h-24',
}) {
    const [current, setCurrent] = useState(0)
    const [playing, setPlaying] = useState(false)
    const rafRef = useRef(null)

    useEffect(() => {
        setCurrent(0)
        setPlaying(false)
    }, [total, trackLabel])

    useEffect(() => {
        if (!playing) return
        let last = null
        const tick = (t) => {
            if (last == null) last = t
            const dt = (t - last) / 1000
            last = t
            setCurrent((c) => (c + dt >= total ? 0 : c + dt))
            rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafRef.current)
    }, [playing, total])

    const seek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
        setCurrent(pct * total)
    }

    const zoneClass = (i) => {
        const third = bars.length / 3
        if (i < third) return 'bg-primary'
        if (i < third * 2) return 'bg-secondary'
        return 'bg-tertiary'
    }

    return (
        <div className="rounded-xl bg-surface-container-lowest p-4 shadow-inner dark:bg-surface-container-lowest">
            <div
                className={`relative flex w-full cursor-pointer items-center gap-[3px] overflow-hidden select-none ${heightClass} px-1`}
                onClick={seek}
            >
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 rounded-l-lg bg-primary-fixed/15" />
                <div className="pointer-events-none absolute inset-y-0 left-1/3 w-2/5 bg-secondary-fixed/20" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 rounded-r-lg bg-tertiary-fixed/20" />

                {bars.map((h, i) => (
                    <div
                        key={i}
                        className={`w-full rounded-full ${zoneClass(i)}`}
                        style={{ height: `${h}%`, opacity: 0.4 + (h / 100) * 0.6 }}
                    />
                ))}

                <div
                    className="pointer-events-none absolute top-0 bottom-0 z-20 w-[2px] bg-primary transition-[left] duration-75"
                    style={{ left: `${(current / total) * 100}%` }}
                >
                    <div className="h-2.5 w-2.5 origin-center -translate-x-[5px] rotate-45 bg-primary shadow-sm" />
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-outline-variant/30 pt-3">
                <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/25" />
                        <button
                            onClick={() => setPlaying((p) => !p)}
                            className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-on-primary shadow-md transition-transform hover:bg-primary-container active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[24px]">
                                {playing ? 'pause' : 'play_arrow'}
                            </span>
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-mono text-sm font-semibold tracking-tight">
                            {fmt(current)}{' '}
                            <span className="font-normal text-on-surface-variant">/ {fmt(total)}</span>
                        </span>
                        <span className="font-mono text-[11px] text-on-surface-variant">{pitchLabel}</span>
                    </div>
                </div>
                <div className="hidden items-center gap-1 rounded-full bg-primary-fixed/40 px-2 py-0.5 font-mono text-[11px] text-primary sm:flex">
                    <span className="material-symbols-outlined text-[14px]">volume_up</span>
                    <span>{trackLabel}</span>
                </div>
            </div>
        </div>
    )
}