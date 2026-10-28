import { useState } from 'react'
import Waveform from '../components/Waveform.jsx'
import Dropzone from '../components/Dropzone.jsx'
import { predictEmotion } from '../lib/api.js'
import { EMOTIONS, DISCLAIMER } from '../lib/emotions.js'

export default function Analyze() {
    const [analyzing, setAnalyzing] = useState(false)
    const [tab, setTab] = useState('upload')
    const [uploadedFile, setUploadedFile] = useState(null)
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')

    const hero = result ? EMOTIONS[result.emotion] : null
    const top = result?.top_k ?? []
    const topPct = top.length ? Math.round(100 * top[0].probability) : null

    const runAnalysis = async () => {
        if (!uploadedFile) {
            setError('Upload an audio file first.')
            return
        }
        setError('')
        setResult(null)
        setAnalyzing(true)
        try {
            const data = await predictEmotion(uploadedFile)
            setResult(data)
        } catch (e) {
            setError(e.message || 'Something went wrong while analyzing the clip.')
        } finally {
            setAnalyzing(false)
        }
    }

    const resetAll = () => {
        setUploadedFile(null)
        setResult(null)
        setError('')
    }

    const breakdownRows = top.slice(0, 4).map((t) => ({
        emoji: EMOTIONS[t.emotion]?.emoji ?? '❔',
        label: EMOTIONS[t.emotion]?.label ?? t.emotion,
        pct: Math.round(100 * t.probability),
        bar: EMOTIONS[t.emotion]?.bar ?? 'bg-outline',
        text: EMOTIONS[t.emotion]?.text ?? 'text-on-surface-variant',
    }))

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
                    </div>
                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                        Discover the emotion <br className="hidden sm:inline" />
                        behind any voice
                    </h1>
                    <p className="mt-1 max-w-2xl text-lg text-on-surface-variant">
                        Upload a clip, let the model analyze its acoustic features, and see
                        the emotion probabilities it detects.
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
                                WAV · MP3 · FLAC · M4A · OGG — max 20 MB
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
                            <Dropzone onFile={(f) => { setUploadedFile(f); setResult(null); setError('') }} />
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

                        {uploadedFile && (
                            <div className="flex items-center gap-2 text-sm">
                                <span className="material-symbols-outlined text-[18px] text-tertiary">audio_file</span>
                                <span className="truncate font-medium">{uploadedFile.name}</span>
                            </div>
                        )}
                    </div>

                    {/* Error banner */}
                    {error && (
                        <div className="flex items-start gap-2 rounded-xl bg-error-container p-4 text-sm text-on-surface">
                            <span className="material-symbols-outlined shrink-0 text-[18px]">error</span>
                            {error}
                        </div>
                    )}

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
                            total={result ? Number(result.duration_sec) : 0}
                            trackLabel={
                                uploadedFile ? `Active Track: ${uploadedFile.name}` : 'No track selected yet'
                            }
                            pitchLabel={result ? 'Analyzed' : 'Awaiting upload'}
                        />

                        <div className="flex flex-col items-center justify-between gap-4 pt-1 sm:flex-row">
                            <span className="text-sm text-on-surface-variant">
                                {uploadedFile
                                    ? `Ready to analyze: ${uploadedFile.name}`
                                    : 'Upload a clip above — then the model will scan its acoustic patterns.'}
                            </span>
                            <button
                                onClick={runAnalysis}
                                disabled={analyzing || !uploadedFile}
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-lg font-semibold text-on-primary shadow-md transition-all hover:bg-primary-container hover:shadow-lg active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
                            {topPct !== null ? (
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary-fixed px-3 py-0.5 font-mono text-[11px] font-medium text-on-secondary-fixed shadow-sm">
                                    <span className="h-2 w-2 animate-ping rounded-full bg-secondary" />
                                    {topPct}% top class score
                                </div>
                            ) : (
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-0.5 font-mono text-[11px] font-medium text-on-surface-variant">
                                    No analysis yet
                                </div>
                            )}
                        </div>

                        <div className="relative flex flex-col items-center overflow-hidden rounded-xl bg-surface-container-lowest p-8 text-center shadow-sm">
                            <div className="pointer-events-none absolute -right-10 -bottom-10 h-36 w-36 rounded-full bg-primary-fixed/20 blur-2xl" />
                            <div className="relative my-2 flex items-center justify-center">
                                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary-fixed/30 select-none">
                                    <span className="text-6xl drop-shadow-sm">{hero ? hero.emoji : '❔'}</span>
                                </div>
                            </div>
                            <span className={`font-mono text-[11px] font-bold tracking-widest uppercase ${hero ? hero.text : 'text-on-surface-variant'}`}>
                                {hero ? 'Primary vocal mood detected' : 'Awaiting analysis'}
                            </span>
                            <h3 className="mt-1 text-3xl font-bold tracking-tight">
                                {hero ? hero.label : 'No prediction yet'}
                            </h3>
                            <p className="mt-1 font-mono text-[11px] text-on-surface-variant">
                                {result
                                    ? `Clip duration: ${Number(result.duration_sec).toFixed(1)}s`
                                    : 'Upload a clip to run the model.'}
                            </p>
                            <div className="mt-5 flex w-full items-start gap-2 rounded-xl bg-surface-container p-4 text-left">
                                <span className="mt-0.5 text-2xl">💬</span>
                                <p className="text-base leading-relaxed">
                                    {hero
                                        ? hero.desc
                                        : 'Once a clip is analyzed, this card will show the detected emotion and its acoustic interpretation.'}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold">Acoustic Tone Breakdown</span>
                                <span className="font-mono text-[11px] text-on-surface-variant">
                                    {result ? 'Class scores' : 'Awaiting upload'}
                                </span>
                            </div>

                            {result && breakdownRows.length > 0 ? (
                                breakdownRows.map((b) => (
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
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ${b.bar}`}
                                                style={{ width: `${b.pct}%` }}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest p-6 text-center text-sm text-on-surface-variant">
                                    The emotion probabilities will appear here once a clip is analyzed.
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-1">
                            <button
                                onClick={resetAll}
                                className="flex items-center justify-center gap-1.5 rounded-full bg-surface-container-high py-3 text-sm font-semibold text-on-surface shadow-sm transition-colors hover:bg-surface-container-highest"
                            >
                                <span className="material-symbols-outlined text-[18px]">refresh</span>
                                Try Another Clip
                            </button>
                            <button
                                onClick={() => result && navigator.clipboard?.writeText(JSON.stringify(result, null, 2))}
                                disabled={!result}
                                className="flex items-center justify-center gap-1.5 rounded-full bg-surface-container-highest py-3 text-sm font-semibold text-on-surface shadow-sm transition-colors hover:bg-surface-container-highest/80 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                Copy Result
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 rounded-xl border-l-4 border-outline-variant bg-surface-container p-4">
                        <span className="material-symbols-outlined mt-0.5 shrink-0 text-[20px] text-outline">info</span>
                        <div>
                            <span className="text-xs font-semibold tracking-wider uppercase">Scientific Transparency Note</span>
                            <p className="mt-1 text-sm text-on-surface-variant">
                                {result?.disclaimer ?? DISCLAIMER}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}