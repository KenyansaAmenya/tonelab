import { useState, useRef } from 'react'

const MELODIES = {
    upbeat: {
        emoji: '😊',
        name: 'The Upbeat Rise',
        desc: 'Happy tone curve. Rising pitch denotes optimism, warmth, and friendly delight.',
        metric: '+48 Hz Inflection',
        path: 'M 50 90 Q 250 85 450 40 T 750 15',
        nodeX: 750, nodeY: 15,
        stroke: '#9d3e1a',
        notes: [261.63, 329.63, 392.0, 523.25],
        color: 'text-primary',
    },
    steady: {
        emoji: '😐',
        name: 'The Steady Anchor',
        desc: 'Smooth flat line. Balanced, deliberate tone of neutral reason, grounding, and focus.',
        metric: '±2 Hz Equanimity',
        path: 'M 50 60 L 250 60 L 500 60 L 750 60',
        nodeX: 750, nodeY: 60,
        stroke: '#456278',
        notes: [329.63, 329.63, 329.63, 329.63],
        color: 'text-secondary',
    },
    spark: {
        emoji: '⚡',
        name: 'The Quick Spark',
        desc: 'Energetic jagged wave. Rapid staccato rhythm with dynamic emotional spark.',
        metric: 'High Velocity Vibrato',
        path: 'M 50 90 L 150 20 L 280 100 L 420 30 L 560 95 L 750 20',
        nodeX: 750, nodeY: 20,
        stroke: '#bd5630',
        notes: [349.23, 587.33, 392.0, 659.25],
        color: 'text-primary',
    },
    gentle: {
        emoji: '🌱',
        name: 'The Gentle Low',
        desc: 'Soft gentle hum. Decelerated acoustic cadence indicating empathy, calm, and ease.',
        metric: '-35 Hz Deep Hum',
        path: 'M 50 40 Q 250 45 450 85 T 750 100',
        nodeX: 750, nodeY: 100,
        stroke: '#4d6055',
        notes: [220.0, 196.0, 174.61, 146.83],
        color: 'text-tertiary',
    },
}

const FAQS = [
    {
        icon: 'psychology_alt',
        bg: 'bg-error-container text-on-error-container',
        q: 'Does ToneLab read my thoughts or lies?',
        a: 'No, ToneLab only listens to vocal melodies and pitch, never your private intent. There is no such thing as a mind-reading microphone: our models simply detect the physiological signs of pace, breath, and sonic energy.',
    },
    {
        icon: 'lock',
        bg: 'bg-tertiary-fixed text-on-tertiary-fixed',
        q: 'Is my audio stored on your servers?',
        a: 'Your recordings stay 100% private in your browser session unless you choose to save them. Our client-side audio engine processes your microphone input in real-time RAM and discards it the moment you finish your session.',
    },
    {
        icon: 'tune',
        bg: 'bg-secondary-fixed text-on-secondary-fixed',
        q: 'Can background noise throw off the results?',
        a: 'ToneLab uses a built-in vocal isolator that attenuates room reverberation, air conditioners, and keyboard clicks before measuring the melodic arc. For optimal results, speaking 6–12 inches from your microphone is best.',
    },
]

export default function HowItWorks({ onNavigate }) {
    const [active, setActive] = useState('upbeat')
    const [status, setStatus] = useState('Audio Engine Ready')
    const audioCtxRef = useRef(null)

    const m = MELODIES[active]

    const playNotes = (notes) => {
        try {
            if (!audioCtxRef.current) {
                const AC = window.AudioContext || window.webkitAudioContext
                if (AC) audioCtxRef.current = new AC()
            }
            const ctx = audioCtxRef.current
            if (!ctx) return
            if (ctx.state === 'suspended') ctx.resume()
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()
                osc.type = 'sine'
                osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.18)
                gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.18)
                gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + i * 0.18 + 0.04)
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.18 + 0.22)
                osc.connect(gain)
                gain.connect(ctx.destination)
                osc.start(ctx.currentTime + i * 0.18)
                osc.stop(ctx.currentTime + i * 0.18 + 0.24)
            })
        } catch (e) {
            /* audio blocked — visual still updates */
        }
    }

    const triggerMelody = (key) => {
        setActive(key)
        setStatus(`Playing: ${MELODIES[key].name}`)
        playNotes(MELODIES[key].notes)
        setTimeout(() => setStatus('Audio Engine Ready'), 1200)
    }

    return (
        <div className="flex flex-col">
            {/* Hero */}
            <div className="relative w-full overflow-hidden bg-surface-container-low px-4 py-16 md:px-6">
                <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
                <div className="pointer-events-none absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-secondary-fixed/30 blur-3xl" />
                <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface-container-high px-4 py-2 shadow-sm">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                        <span className="font-mono text-[11px] tracking-wider text-on-surface-variant uppercase">Demystifying Acoustic AI</span>
                        <span className="font-mono text-[11px] text-outline-variant">•</span>
                        <span className="font-mono text-[11px] text-tertiary">Zero Jargon</span>
                    </div>
                    <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
                        How ToneLab Listens to Voice Emotion
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-on-surface-variant">
                        No mind reading. No confusing algorithms. Just simple sound patterns
                        translated into everyday feelings.
                    </p>
                    <div className="mt-8 grid w-full max-w-lg grid-cols-3 gap-4 rounded-full bg-surface-container p-1 shadow-sm">
                        {[
                            { icon: 'graphic_eq', color: 'text-primary', label: '1. Sound' },
                            { icon: 'straighten', color: 'text-secondary', label: '2. Clues' },
                            { icon: 'sentiment_satisfied', color: 'text-tertiary', label: '3. Insight' },
                        ].map((s) => (
                            <div key={s.label} className="flex items-center justify-center gap-1.5 rounded-full bg-surface px-3 py-1.5 shadow-sm">
                                <span className={`material-symbols-outlined text-[18px] ${s.color}`}>{s.icon}</span>
                                <span className="text-xs font-semibold">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3-Step Process */}
            <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-16 md:px-6">
                <div className="flex flex-col justify-between gap-4 pb-2 md:flex-row md:items-end">
                    <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[11px] tracking-widest text-primary uppercase">Acoustic Anatomy</span>
                        <h2 className="text-3xl font-semibold sm:text-4xl">The 3-Step Rhythm</h2>
                    </div>
                    <p className="max-w-md text-on-surface-variant">
                        Every inflection has a physical shape. Here is how your spoken
                        syllables become crystal-clear emotional insights.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Stage 1 */}
                    <div className="group relative flex flex-col rounded-xl bg-surface-container p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                        <div className="mb-6 flex items-center justify-between">
                            <span className="rounded-full bg-surface-container-high px-2.5 py-0.5 font-mono text-[11px] font-semibold text-on-surface-variant">STAGE 01</span>
                            <span className="h-2.5 w-2.5 rounded-full bg-primary/40 transition-colors group-hover:bg-primary" />
                        </div>
                        <h3 className="mb-1.5 text-lg font-semibold">1. You Speak or Upload</h3>
                        <p className="mb-6 text-on-surface-variant">
                            Your voice is divided into tiny acoustic slices right on your
                            device. Never raw text, just physical sound vibration.
                        </p>
                        <div className="relative mt-auto flex h-44 flex-col justify-between overflow-hidden rounded-xl bg-surface-container-low p-4 shadow-inner">
                            <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                                <span className="flex items-center gap-0.5 text-primary">
                                    <span className="material-symbols-outlined text-[16px]">mic</span> In-Browser Slice
                                </span>
                                <span>20ms Windows</span>
                            </div>
                            <div className="my-auto flex h-20 w-full items-center justify-center gap-1.5">
                                {[8, 14, 16, 10, 12, 16, 6, 10].map((h, i) => (
                                    <div
                                        key={i}
                                        className={`w-1.5 animate-bounce rounded-full ${i % 3 === 3 ? 'bg-secondary' : 'bg-primary'}`}
                                        style={{ height: `${h * 4}%`, animationDelay: `${i * 0.1}s`, animationDuration: `${0.8 + (i % 4) * 0.2}s` }}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center justify-between border-t border-outline-variant/20 pt-2 font-mono text-[11px] text-outline">
                                <span>Buffer: 0.00s</span>
                                <span className="text-tertiary">Local Device Only</span>
                            </div>
                        </div>
                    </div>

                    {/* Stage 2 */}
                    <div className="group relative flex flex-col rounded-xl bg-surface-container p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                        <div className="mb-6 flex items-center justify-between">
                            <span className="rounded-full bg-secondary-container px-2.5 py-0.5 font-mono text-[11px] font-semibold text-on-secondary-fixed">STAGE 02</span>
                            <span className="h-2.5 w-2.5 rounded-full bg-secondary/40 transition-colors group-hover:bg-secondary" />
                        </div>
                        <h3 className="mb-1.5 text-lg font-semibold">2. We Measure 3 Simple Clues</h3>
                        <p className="mb-4 text-on-surface-variant">
                            Just like human ears naturally do, ToneLab checks three tactile
                            acoustic signatures without deciphering words.
                        </p>
                        <div className="mt-auto flex flex-col gap-2">
                            {[
                                { emoji: '🎵', bg: 'bg-primary-fixed', color: 'text-primary', title: 'Pitch & Melody', desc: 'Does voice rise excitedly or dip into calmness?' },
                                { emoji: '⏱️', bg: 'bg-secondary-fixed', color: 'text-secondary', title: 'Pace & Rhythm', desc: 'Speaking quickly or taking slow, thoughtful pauses?' },
                                { emoji: '🌊', bg: 'bg-tertiary-fixed', color: 'text-tertiary', title: 'Warmth & Energy', desc: 'Bright and resonant or quiet, husky and muffled?' },
                            ].map((c) => (
                                <div key={c.title} className="flex items-start gap-3 rounded-xl bg-surface-container-low p-3 transition-colors hover:bg-surface-container">
                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm ${c.bg}`}>
                                        <span>{c.emoji}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold">{c.title}</span>
                                        <span className="text-sm text-on-surface-variant">{c.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stage 3 */}
                    <div className="group relative flex flex-col rounded-xl bg-surface-container p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                        <div className="mb-6 flex items-center justify-between">
                            <span className="rounded-full bg-tertiary-fixed px-2.5 py-0.5 font-mono text-[11px] font-semibold text-on-tertiary-fixed">STAGE 03</span>
                            <span className="h-2.5 w-2.5 rounded-full bg-tertiary/40 transition-colors group-hover:bg-tertiary" />
                        </div>
                        <h3 className="mb-1.5 text-lg font-semibold">3. Instant Friendly Insights</h3>
                        <p className="mb-6 text-on-surface-variant">
                            We compare the sound cues against thousands of voice patterns to
                            find the closest match.
                        </p>
                        <div className="relative mt-auto flex h-44 flex-col justify-between overflow-hidden rounded-xl bg-surface-container-low p-4 shadow-inner">
                            <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                                <span className="flex items-center gap-1.5 text-tertiary">
                                    <span className="h-1.5 w-1.5 rounded-full bg-tertiary" /> Pattern Matched
                                </span>
                                <span>98.4% Confidence</span>
                            </div>
                            <div className="my-auto flex items-center justify-around py-2">
                                {['😊', '😐', '😲', '🧐'].map((e, i) => (
                                    <div
                                        key={e}
                                        className="flex h-12 w-12 animate-bounce cursor-pointer items-center justify-center rounded-xl bg-surface text-2xl shadow-sm transition-transform hover:scale-110"
                                        style={{ animationDelay: `${i * 0.15}s`, animationDuration: `${1.4 + i * 0.2}s` }}
                                    >
                                        {e}
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between rounded bg-surface-container-high px-2.5 py-1 font-mono text-[11px]">
                                <span>Detected Mood:</span>
                                <span className="font-semibold text-primary">Confident &amp; Warm</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Melody Playground */}
            <section className="w-full bg-surface-container-low py-16">
                <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:px-6">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary-fixed px-2.5 py-0.5 font-mono text-[11px] font-semibold text-on-primary-fixed">
                                <span className="material-symbols-outlined text-[14px]">play_circle</span> INTERACTIVE DEMO
                            </div>
                            <h2 className="text-3xl font-semibold sm:text-4xl">Try the Emotion Melody Playground</h2>
                            <p className="mt-2 max-w-xl text-on-surface-variant">
                                Click any voice curve below to preview how vocal pitch bends
                                emotion. Hear and see the musical shape of speech.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl bg-surface-container px-4 py-2.5 shadow-sm">
                            <span className="h-2 w-2 animate-ping rounded-full bg-secondary" />
                            <span className="font-mono text-[11px] font-medium">{status}</span>
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-6 rounded-xl bg-surface p-6 shadow-md">
                        <div className="relative flex h-40 w-full flex-col justify-between overflow-hidden rounded-xl bg-surface-container-highest p-4 shadow-inner">
                            <div className="z-10 flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                                <span className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[16px] text-primary">monitoring</span>
                                    {m.name}
                                </span>
                                <span className={`font-semibold ${m.color}`}>{m.metric}</span>
                            </div>
                            <svg className="pointer-events-none absolute inset-0 h-full w-full p-6" viewBox="0 0 800 120" fill="none">
                                <path d={m.path} stroke={m.stroke} strokeWidth="4" strokeLinecap="round" className="transition-all duration-700 ease-out" />
                                <circle cx={m.nodeX} cy={m.nodeY} r="7" fill={m.stroke} className="transition-all duration-700 ease-out" />
                            </svg>
                            <div className="z-10 flex items-center justify-between pt-10 font-mono text-[11px] text-on-surface-variant">
                                <span>0.00s Base Note</span>
                                <span className="text-outline">Tonal Arc: 1.40s</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {Object.entries(MELODIES).map(([key, cfg]) => (
                                <button
                                    key={key}
                                    onClick={() => triggerMelody(key)}
                                    className={`rounded-xl bg-surface-container p-4 text-left shadow-sm transition-all hover:bg-surface-container-high active:translate-y-0.5 ${active === key ? 'ring-2 ring-primary' : ''
                                        }`}
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <div className={`text-3xl transition-transform duration-300 ${active === key ? 'scale-125 -translate-y-1' : ''}`}>
                                            {cfg.emoji}
                                        </div>
                                        <span className={`rounded px-1.5 py-0.5 font-mono text-[11px] font-medium ${active === key ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
                                            }`}>
                                            {active === key ? 'ACTIVE' : 'SELECT'}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-semibold">{cfg.name}</h4>
                                    <p className="mt-0.5 text-sm text-on-surface-variant">{cfg.desc}</p>
                                    <div className={`mt-3 flex items-center gap-1 text-xs font-semibold ${cfg.color}`}>
                                        <span className="material-symbols-outlined text-[18px]">volume_up</span> Play Curve
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Studio heritage + features */}
            <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-16 md:px-6">
                <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
                    <div className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-xl bg-surface-container p-8 shadow-md">
                        <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
                        <div className="relative z-10 flex flex-col gap-3">
                            <span className="w-fit rounded bg-surface px-2.5 py-0.5 font-mono text-[11px] font-semibold text-primary shadow-sm">STUDIO HERITAGE</span>
                            <h3 className="text-3xl font-semibold">Like Music, Speech Has A Natural Cadence</h3>
                            <p className="max-w-md text-on-surface-variant">
                                When someone says "I am fine," the meaning never lives in the
                                dictionary definition. It lives in the breath, the hesitation,
                                and whether their tone drops or lifts at the punctuation.
                            </p>
                        </div>
                        <div className="relative z-10 mt-8 flex items-center justify-between rounded-xl bg-surface/85 p-4 shadow-sm backdrop-blur-md">
                            <div className="flex items-center gap-2.5">
                                <span className="material-symbols-outlined text-[24px] text-primary">graphic_eq</span>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">Acoustic Inflection</span>
                                    <span className="font-mono text-[11px] text-on-surface-variant">44.1kHz High Resolution</span>
                                </div>
                            </div>
                            <span className="font-mono text-[11px] font-semibold text-tertiary">Verified Model</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        {[
                            { icon: 'hearing', bg: 'bg-primary text-on-primary', title: 'Language Agnostic', desc: 'Whether you speak English, Spanish, Japanese, or French, human emotions share identical phonetic pitch signatures across every continent.' },
                            { icon: 'security', bg: 'bg-secondary text-on-secondary', title: 'Zero Word Transcription', desc: 'Because ToneLab discards phonemes and linguistic vocabulary, private speech details never turn into searchable text.' },
                            { icon: 'speed', bg: 'bg-tertiary text-on-tertiary', title: 'Sub-Second Feedback', desc: 'Local WebAssembly decoders analyze micro-variations in audio signals instantly without high latency network roundtrips.' },
                        ].map((f) => (
                            <div key={f.title} className="flex items-start gap-4 rounded-xl bg-surface-container p-5 shadow-sm">
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ${f.bg}`}>
                                    <span className="material-symbols-outlined text-[20px]">{f.icon}</span>
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-lg font-semibold">{f.title}</h4>
                                    <p className="mt-0.5 text-on-surface-variant">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ + CTA */}
            <section className="w-full bg-surface-container py-16">
                <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 md:px-6">
                    <div className="flex flex-col items-center text-center">
                        <span className="mb-1.5 font-mono text-[11px] tracking-widest text-primary uppercase">Clear Promises</span>
                        <h2 className="text-3xl font-semibold sm:text-4xl">Privacy &amp; Common Questions</h2>
                        <p className="mt-2 max-w-xl text-on-surface-variant">
                            Clear, honest boundaries on how we treat your voice and identity.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {FAQS.map((f) => (
                            <div key={f.q} className="flex flex-col gap-2 rounded-xl bg-surface p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${f.bg}`}>
                                        <span className="material-symbols-outlined text-[18px]">{f.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold">{f.q}</h3>
                                </div>
                                <p className="pl-11 text-on-surface-variant">{f.a}</p>
                            </div>
                        ))}
                    </div>

                    <div className="relative mt-4 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary-container p-8 text-on-primary shadow-lg md:flex-row md:p-10">
                        <div className="pointer-events-none absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-surface-bright/10 blur-2xl" />
                        <div className="z-10 flex flex-col gap-1.5 text-center md:text-left">
                            <span className="font-mono text-[11px] tracking-widest text-primary-fixed uppercase">Ready to Experience It?</span>
                            <h3 className="text-3xl font-semibold">Ready to test your voice?</h3>
                            <p className="max-w-md text-primary-fixed">
                                Speak into ToneLab for just 5 seconds and discover the musical
                                geometry behind your spoken tone.
                            </p>
                        </div>
                        <button
                            onClick={() => onNavigate('analyze')}
                            className="z-10 flex w-full items-center justify-center gap-2 rounded-xl bg-surface px-8 py-3 text-lg font-semibold text-primary shadow-md transition-all hover:bg-surface-bright active:translate-y-0.5 sm:w-auto"
                        >
                            <span className="material-symbols-outlined text-[20px]">mic</span>
                            Start Free Analysis
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}