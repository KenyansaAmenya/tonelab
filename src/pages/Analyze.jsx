import { useState } from 'react'
import Waveform from '../components/Waveform.jsx'
import Dropzone from '../components/Dropzone.jsx'

const SAMPLES = {
    upbeat: {
        emoji: '😊',
        name: 'Upbeat Greeting',
        meta: '3.9s • High Warmth',
        title: 'Joyful & Energetic',
        track: 'Upbeat_Morning_Voice.wav',
        duration: 3.9,
        pitch: 'Pitch: 224 Hz • Melodic Warmth',
        accentText: 'text-primary',
        takeaway:
            'The speaker sounds warm, upbeat, and engaged with natural melodic pitch rises that indicate high enthusiasm and genuine comfort.',
        breakdown: [
            { emoji: '😊', label: 'Joyful / Uplifting', pct: 68, bar: 'bg-primary', text: 'text-primary' },
            { emoji: '😐', label: 'Calm / Steady', pct: 18, bar: 'bg-secondary', text: 'text-secondary' },
            { emoji: '😲', label: 'Surprised / Inquisitive', pct: 8, bar: 'bg-tertiary', text: 'text-tertiary' },
            { emoji: '🧐', label: 'Thoughtful / Serious', pct: 6, bar: 'bg-outline', text: 'text-on-surface-variant' },
        ],
    },
    calm: {
        emoji: '🤔',
        name: 'Calm Explanation',
        meta: '4.2s • Steady Pitch',
        title: 'Reflective & Composed',
        track: 'Calm_Explainer_Mono.wav',
        duration: 4.2,
        pitch: 'Pitch: 196 Hz • Steady Anchor',
        accentText: 'text-secondary',
        takeaway:
            'The speaker maintains a measured, resonant cadence with balanced breath intervals, demonstrating thoughtful articulation.',
        breakdown: [
            { emoji: '😐', label: 'Calm / Steady', pct: 74, bar: 'bg-secondary', text: 'text-secondary' },
            { emoji: '🧐', label: 'Thoughtful / Serious', pct: 14, bar: 'bg-outline', text: 'text-on-surface-variant' },
            { emoji: '😊', label: 'Joyful / Uplifting', pct: 8, bar: 'bg-primary', text: 'text-primary' },
            { emoji: '😲', label: 'Surprised / Inquisitive', pct: 4, bar: 'bg-tertiary', text: 'text-tertiary' },
        ],
    },
    frustrated: {
        emoji: '⚡',
        name: 'Frustrated Feedback',
        meta: '2.8s • Sharp Tones',
        title: 'Intense & Strained',
        track: 'Urgent_Feedback_Raw.wav',
        duration: 2.8,
        pitch: 'Pitch: 287 Hz • Elevated Pressure',
        accentText: 'text-error',
        takeaway:
            'The speaker exhibits elevated dynamic vocal pressure and abbreviated vowel closures, characteristic of urgent feedback.',
        breakdown: [
            { emoji: '⚡', label: 'Intense / Urgent', pct: 71, bar: 'bg-error', text: 'text-error' },
            { emoji: '😐', label: 'Calm / Steady', pct: 17, bar: 'bg-secondary', text: 'text-secondary' },
            { emoji: '😲', label: 'Surprised / Inquisitive', pct: 8, bar: 'bg-tertiary', text: 'text-tertiary' },
            { emoji: '🧐', label: 'Thoughtful / Serious', pct: 4, bar: 'bg-outline', text: 'text-on-surface-variant' },
        ],
    },
}

export default function Analyze() {
    const [sample, setSample] = useState('upbeat')
    const [analyzing, setAnalyzing] = useState(false)
    const [tab, setTab] = useState('upload')
    const [uploadedFile, setUploadedFile] = useState(null)
    const s = SAMPLES[sample]

    const runAnalysis = () => {
        setAnalyzing(true)
        setTimeout(() => setAnalyzing(false), 1200)
    }

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
            {/* Hero banner */}
            <div className="relative mb-10 overflow-hidden rounded-3xl bg-surface-container-low p-8 shadow-sm sm:p-10">
                <div className="pointer-events-none absolute -top-12 -right-12 h-80 w-80 rounded-full bg-primary-fixed/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 right-1/4 h-64 w-64 rounded-full bg-secondary-fixed/25 blur-3xl" />
                <div className="relative z-10 flex max-w-3xl flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-0.5 font-mono text-[11px] font-semibold tracking-wider text-on-primary-fixed uppercase shadow-sm">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                            Acoustic Studio V2.4
                        </span>
                        <span className="hidden font-mono text-[11px] text-on-surface-variant sm:inline">
                            Session ID: #TL-8842-EMO
                        </span>
                    </div>
                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                        Discover the emotion <br className="hidden sm:inline" />
                        behind any voice
                    </h1>
                    <p className="mt-1 max-w-2xl text-lg text-on-surface-variant">
                        Understand vocal cadence, warmth, and emotion in seconds with a
                        simple 3-step check.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                {/* Left column: Steps 1 & 2 */}
                <div className="flex flex-col gap-6 lg:col-span-7">
                    {/* Step 1 */}
                    <div className="flex flex-col gap-5 rounded-xl bg-surface-container-low p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-container-highest font-mono text-[11px] font-bold">
                                    1
                                </span>
                                <h2 className="text-lg font-semibold">Choose Voice Clip</h2>
                            </div>
                            <span className="font-mono text-[11px] text-on-surface-variant">
                                Lossless Audio / PCM 48kHz
                            </span>
                        </div>

                        <div className="flex w-full max-w-md gap-0.5 rounded-full bg-surface-container-high p-0.5">
                            {[
                                { id: 'upload', icon: '📁', label: 'Upload Audio File' },
                                { id: 'record', icon: '🎙️', label: 'Record Microphone' },
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTab(t.id)}
                                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-all ${tab === t.id
                                            ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                                            : 'text-on-surface-variant hover:text-on-surface'
                                        }`}
                                >
                                    <span>{t.icon}</span>
                                    <span>{t.label}</span>
                                </button>
                            ))}
                        </div>

                        {tab === 'upload' ? (
                            <Dropzone onFile={setUploadedFile} />
                        ) : (
                            <div className="flex flex-col items-center rounded-xl bg-surface-container-lowest p-8 text-center">
                                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-secondary-fixed/50 text-secondary">
                                    <span className="material-symbols-outlined text-[28px]">mic</span>
                                </div>
                                <p className="mb-1 text-lg font-medium">Record from your microphone</p>
                                <p className="max-w-sm text-sm text-on-surface-variant">
                                    Microphone capture is coming soon — for now, please upload an
                                    audio file.
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col gap-2 pt-1">
                            <span className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase">
                                Or try a curated speech sample:
                            </span>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                {Object.entries(SAMPLES).map(([key, cfg]) => (
                                    <button
                                        key={key}
                                        onClick={() => setSample(key)}
                                        className={`flex items-center gap-3 rounded-xl p-4 text-left transition-all ${sample === key
                                                ? 'bg-surface-container-lowest ring-2 ring-primary'
                                                : 'bg-surface-container hover:bg-surface-container-high'
                                            }`}
                                    >
                                        <span className="text-2xl">{cfg.emoji}</span>
                                        <div className="flex min-w-0 flex-col">
                                            <span className="truncate text-sm font-semibold">{cfg.name}</span>
                                            <span className="font-mono text-[11px] text-on-surface-variant">{cfg.meta}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col gap-5 rounded-xl bg-surface-container-low p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-container-highest font-mono text-[11px] font-bold">
                                    2
                                </span>
                                <h2 className="text-lg font-semibold">Listen &amp; Preview</h2>
                            </div>
                        </div>

                        <Waveform
                            total={s.duration}
                            trackLabel={
                                uploadedFile ? `Active Track: ${uploadedFile.name}` : `Active Track: ${s.track}`
                            }
                            pitchLabel={s.pitch}
                        />

                        <div className="flex flex-col items-center justify-between gap-4 pt-1 sm:flex-row">
                            <span className="text-sm text-on-surface-variant">
                                {uploadedFile
                                    ? `Ready to analyze: ${uploadedFile.name}`
                                    : 'Ready to scan harmonic frequency patterns.'}
                            </span>
                            <button
                                onClick={runAnalysis}
                                disabled={analyzing}
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-lg font-semibold text-on-primary shadow-md transition-all hover:bg-primary-container hover:shadow-lg active:translate-y-px disabled:opacity-80 sm:w-auto"
                            >
                                {analyzing ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                                        <span>Analyzing harmonics...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>✨</span>
                                        <span>Analyze Voice Tone</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right column: Step 3 result */}
                <div className="flex flex-col gap-6 lg:col-span-5">
                    <div className="flex flex-col gap-5 rounded-xl bg-surface-container-low p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-fixed font-mono text-[11px] font-bold text-on-primary-fixed">
                                    3
                                </span>
                                <h2 className="text-lg font-semibold">Mood Assessment</h2>
                            </div>
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed px-3 py-0.5 font-mono text-[11px] font-medium text-on-secondary-fixed shadow-sm">
                                <span className="h-2 w-2 animate-ping rounded-full bg-secondary" />
                                96.4% High Confidence
                            </div>
                        </div>

                        <div className="relative flex flex-col items-center overflow-hidden rounded-xl bg-surface-container-lowest p-8 text-center shadow-sm">
                            <div className="pointer-events-none absolute -right-10 -bottom-10 h-36 w-36 rounded-full bg-primary-fixed/20 blur-2xl" />
                            <div className="relative my-2 flex items-center justify-center">
                                <div className="flex h-28 w-28 animate-joyful-bounce cursor-pointer items-center justify-center rounded-full bg-primary-fixed/30 select-none">
                                    <span className="text-6xl drop-shadow-sm">{s.emoji}</span>
                                </div>
                                <div className="absolute -top-1 -right-2 animate-gentle-tilt text-2xl">✨</div>
                            </div>
                            <span className={`font-mono text-[11px] font-bold tracking-widest uppercase ${s.accentText}`}>
                                Primary Vocal Mood Detected
                            </span>
                            <h3 className="mt-1 text-3xl font-bold tracking-tight">{s.title}</h3>
                            <p className="mt-1 font-mono text-[11px] text-on-surface-variant">
                                Cadence: Uplifting • Timbre: Resonant
                            </p>
                            <div className="mt-5 flex w-full items-start gap-2 rounded-xl bg-surface-container p-4 text-left">
                                <span className="mt-0.5 text-2xl">💬</span>
                                <p className="text-base leading-relaxed">{s.takeaway}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold">Acoustic Tone Breakdown</span>
                                <span className="font-mono text-[11px] text-on-surface-variant">Spectral Weight</span>
                            </div>
                            {s.breakdown.map((b) => (
                                <div
                                    key={b.label}
                                    className="flex flex-col gap-1 rounded-xl bg-surface-container-lowest p-4 transition-colors hover:bg-surface-container"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">{b.emoji}</span>
                                            <span className="text-sm font-medium">{b.label}</span>
                                        </div>
                                        <span className={`font-mono text-sm font-bold ${b.text}`}>{b.pct}%</span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                                        <div className={`h-full rounded-full ${b.bar}`} style={{ width: `${b.pct}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-1">
                            <button
                                onClick={() => setSample('upbeat')}
                                className="flex items-center justify-center gap-1.5 rounded-full bg-surface-container-high py-3 text-sm font-semibold text-on-surface shadow-sm transition-colors hover:bg-surface-container-highest"
                            >
                                <span className="material-symbols-outlined text-[18px]">refresh</span>
                                Try Another Sample
                            </button>
                            <button className="flex items-center justify-center gap-1.5 rounded-full bg-surface-container-highest py-3 text-sm font-semibold text-on-surface shadow-sm transition-colors hover:bg-surface-container-highest/80">
                                <span className="material-symbols-outlined text-[18px]">share</span>
                                Share Summary
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 rounded-xl border-l-4 border-outline-variant bg-surface-container p-4">
                        <span className="material-symbols-outlined mt-0.5 shrink-0 text-[20px] text-outline">info</span>
                        <div>
                            <span className="text-xs font-semibold tracking-wider uppercase">Scientific Transparency Note</span>
                            <p className="mt-1 text-sm text-on-surface-variant">
                                ToneLab analyzes how vocal sound patterns compare to spoken
                                recordings, not what someone is truly feeling inside. Always
                                consider social and cultural context.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}