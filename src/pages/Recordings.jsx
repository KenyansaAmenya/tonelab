import { useState } from 'react'

const RECORDINGS = [
    {
        id: 1,
        category: 'joyful',
        name: 'Team Standup Intro.mp3',
        duration: '4.2s',
        date: 'Today at 10:15 AM',
        mic: 'Studio Mic Alpha',
        mood: { emoji: '😊', label: 'Joyful (74%)', badge: 'bg-primary-fixed text-on-primary-fixed' },
        insight: 'Laughter detected at 00:02.1',
        insightDot: 'bg-tertiary',
        peak: 'Joyful Cadence Peak',
        peakColor: 'text-primary',
        bars: [30, 45, 60, 85, 100, 75, 65, 90, 80, 60, 40, 70, 95, 60, 45, 35, 50, 30, 20, 40, 65, 55, 30, 15],
        colored: true,
        highlight: { left: '25%', right: '35%' },
    },
    {
        id: 2,
        category: 'calm',
        name: 'Client Demo Practice.wav',
        duration: '12.8s',
        date: 'Yesterday at 4:40 PM',
        mic: 'Headset Mic',
        mood: { emoji: '😐', label: 'Calm & Steady (81%)', badge: 'bg-secondary-fixed text-on-secondary-fixed' },
        insight: 'Extremely reassuring pitch stability (94%)',
        insightDot: 'bg-secondary',
        peak: 'Consistent Monotone Flow',
        peakColor: 'text-secondary',
        bars: [40, 50, 45, 48, 52, 46, 50, 42, 45, 49, 47, 44, 40, 42, 46, 48, 44, 38, 30, 25],
        colored: false,
    },
    {
        id: 3,
        category: 'energetic',
        name: 'Podcast Cold Open Take 2.mp3',
        duration: '8.5s',
        date: 'Oct 14, 2024',
        mic: 'Condenser Studio Setup',
        mood: { emoji: '⚡', label: 'High Excitement (88%)', badge: 'bg-primary-fixed text-on-primary-fixed' },
        insight: 'Rapid syllable pacing: 4.8 words/sec',
        insightDot: 'bg-primary',
        peak: 'Dynamic Intensity Burst',
        peakColor: 'text-primary',
        bars: [20, 35, 95, 100, 90, 75, 88, 60, 70, 92, 85, 60, 40, 25, 15],
        colored: false,
    },
    {
        id: 4,
        category: 'reflective',
        name: 'Customer Feedback Re-read.wav',
        duration: '5.1s',
        date: 'Oct 12, 2024',
        mic: 'Lapel Clip Mic',
        mood: { emoji: '🧐', label: 'Thoughtful / Empathetic (64%)', badge: 'bg-tertiary-fixed text-on-tertiary-fixed' },
        insight: 'Soft resonance with warm downward inflection',
        insightDot: 'bg-tertiary',
        peak: 'Introspective Pauses Detected',
        peakColor: 'text-tertiary',
        bars: [35, 55, 45, 20, 15, 10, 45, 60, 50, 30, 20],
        colored: false,
    },
]

const FILTERS = [
    { id: 'all', label: 'All', count: 18 },
    { id: 'joyful', label: 'Joyful', count: 8, emoji: '😊' },
    { id: 'calm', label: 'Calm', count: 5, emoji: '😐' },
    { id: 'energetic', label: 'Energetic', count: 3, emoji: '⚡' },
    { id: 'reflective', label: 'Reflective', count: 2, emoji: '🤔' },
]

const WEEK = [
    { day: 'Mon', emoji: '😊', label: 'Joyful', bg: 'bg-surface-container-high hover:bg-primary-fixed', tip1: 'Monday Take', tip2: '92% Warmth tone' },
    { day: 'Tue', emoji: '😐', label: 'Calm', bg: 'bg-secondary-fixed/50 hover:bg-secondary-fixed', tip1: 'Tuesday Take', tip2: 'Pitch: Steady' },
    { day: 'Wed', emoji: '⚡', label: 'Energy', bg: 'bg-primary-fixed/50 hover:bg-primary-fixed', tip1: 'Wednesday', tip2: 'Cold open podcast' },
    { day: 'Thu', emoji: '😐', label: 'Calm', bg: 'bg-surface-container-high hover:bg-secondary-fixed', tip1: 'Thursday', tip2: 'Demo practice' },
    { day: 'Fri', emoji: '😊', label: 'Today', bg: 'bg-primary text-on-primary ring-4 ring-primary/20', tip1: "Today's Standup", tip2: '74% Joyful', active: true },
]

export default function Recordings() {
    const [filter, setFilter] = useState('all')
    const [playingId, setPlayingId] = useState(null)

    const visible = RECORDINGS.filter((r) => filter === 'all' || r.category === filter)

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
            {/* Header */}
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="flex max-w-2xl flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-primary uppercase">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                        Personal Acoustic Archive
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                        Past Recordings &amp; Voice Moments
                    </h1>
                    <p className="text-lg text-on-surface-variant">
                        Listen back to your saved audio clips, track mood trends, and see
                        emotional shifts over time.
                    </p>
                </div>
                <div className="flex items-center gap-2 self-start md:self-auto">
                    <button className="flex items-center gap-1.5 rounded-xl bg-surface-container-high px-4 py-1.5 text-sm shadow-sm transition-all hover:bg-surface-container-highest active:translate-y-px">
                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                        <span>Last 30 Days</span>
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
                    </button>
                    <button className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-1.5 text-sm text-on-primary shadow-md transition-all hover:bg-primary-container active:translate-y-px">
                        <span className="material-symbols-outlined text-[18px]">mic</span>
                        <span>New Journal Take</span>
                    </button>
                </div>
            </div>

            {/* Metrics */}
            <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col justify-between gap-4 rounded-xl bg-surface-container-low p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-on-surface-variant">Recordings Analyzed</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container-highest text-primary">
                            <span className="material-symbols-outlined text-[20px]">audio_file</span>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-semibold tracking-tight sm:text-5xl">18</span>
                        <span className="font-mono text-[11px] text-on-surface-variant uppercase">Clips Saved</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-tertiary">
                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                        <span>+4 takes logged this week</span>
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-4 rounded-xl bg-surface-container-low p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-on-surface-variant">Most Frequent Tone</span>
                        <span className="animate-bounce text-2xl">😊</span>
                    </div>
                    <div>
                        <div className="text-lg font-semibold">Joyful &amp; Warm</div>
                        <span className="font-mono text-[11px] font-semibold text-primary">42% OF ALL TAKES</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
                        <div className="h-full rounded-full bg-primary" style={{ width: '42%' }} />
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-4 rounded-xl bg-surface-container-low p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-on-surface-variant">Average Energy Level</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-fixed">
                            <span className="material-symbols-outlined text-[20px]">waves</span>
                        </div>
                    </div>
                    <div>
                        <div className="text-lg font-semibold">Balanced &amp; Clear</div>
                        <span className="font-mono text-[11px] font-semibold text-secondary">62.4 Hz VOCAL RANGE</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-container-highest">
                            <div className="h-full rounded-full bg-secondary" style={{ width: '68%' }} />
                        </div>
                        <span className="text-xs text-on-surface-variant">Optimal</span>
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-4 rounded-xl bg-surface-container-low p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-on-surface-variant">Voice Journal Streak</span>
                        <span className="text-2xl">🔥</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-semibold tracking-tight sm:text-5xl">4</span>
                        <span className="font-mono text-[11px] text-on-surface-variant uppercase">Days Active</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                        <span className="material-symbols-outlined text-[16px]">military_tech</span>
                        <span>Personal Best Streak!</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                {/* Feed */}
                <div className="flex flex-col gap-5 lg:col-span-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-1">
                        <div className="flex flex-wrap items-center gap-0.5 rounded-full bg-surface-container-high p-0.5 shadow-inner">
                            {FILTERS.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setFilter(f.id)}
                                    className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-all ${filter === f.id
                                            ? 'bg-surface-container-lowest font-semibold text-on-surface shadow-sm'
                                            : 'text-on-surface-variant hover:text-on-surface'
                                        }`}
                                >
                                    {f.emoji && <span>{f.emoji}</span>}
                                    <span>{f.label}</span>
                                    <span className="rounded bg-surface-container-high px-1 font-mono text-[11px] text-on-surface-variant">
                                        {f.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-1 text-on-surface-variant">
                            <button aria-label="Sort options" className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-surface-container">
                                <span className="material-symbols-outlined text-[20px]">sort</span>
                            </button>
                            <button aria-label="Search recordings" className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-surface-container">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {visible.map((r) => (
                            <div key={r.id} className="rounded-xl bg-surface-container-lowest p-5 shadow-sm transition-all hover:shadow-md">
                                <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                    <div className="flex items-start gap-3">
                                        <button
                                            aria-label="Play recording"
                                            onClick={() => setPlayingId(playingId === r.id ? null : r.id)}
                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-md transition-transform active:scale-95 ${playingId === r.id
                                                    ? 'bg-primary text-on-primary'
                                                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-[26px]">
                                                {playingId === r.id ? 'pause' : 'play_arrow'}
                                            </span>
                                        </button>
                                        <div className="flex flex-col">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-lg font-semibold">{r.name}</span>
                                                <span className="rounded bg-surface-container-high px-1.5 py-0.5 font-mono text-[11px] text-on-surface-variant">
                                                    {r.duration}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                                                <span className="material-symbols-outlined text-[15px]">schedule</span>
                                                <span>{r.date}</span>
                                                <span className="text-outline-variant">•</span>
                                                <span>{r.mic}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-xs font-semibold sm:self-auto ${r.mood.badge}`}>
                                        <span>{r.mood.emoji}</span>
                                        <span>{r.mood.label}</span>
                                    </span>
                                </div>

                                <div className="relative flex flex-col gap-1 rounded-lg bg-surface-container-low p-4">
                                    <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
                                        <span>00:00.0</span>
                                        <span className={`font-semibold ${r.peakColor}`}>{r.peak}</span>
                                        <span>{`00:${r.duration}`}</span>
                                    </div>
                                    <div className="relative flex h-10 w-full items-center gap-[3px] py-1">
                                        {r.highlight && (
                                            <div
                                                className="pointer-events-none absolute inset-y-0 rounded-md bg-primary/10"
                                                style={{ left: r.highlight.left, right: r.highlight.right }}
                                            />
                                        )}
                                        {r.bars.map((h, i) => (
                                            <div
                                                key={i}
                                                className={`w-1 rounded-full ${r.colored && i < 10 ? 'bg-primary' : 'bg-surface-container-highest'}`}
                                                style={{ height: `${h}%` }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant">
                                        <span className={`h-1.5 w-1.5 rounded-full ${r.insightDot}`} />
                                        {r.insight}
                                    </span>
                                    <button className="flex items-center gap-0.5 text-sm font-semibold text-primary transition-colors hover:text-primary-container">
                                        <span>View Breakdown</span>
                                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 pb-4 text-sm text-on-surface-variant">
                        <span>Showing {visible.length} of 18 voice recordings</span>
                        <button className="rounded-xl bg-surface-container px-5 py-1.5 font-semibold text-on-surface shadow-sm transition-colors hover:bg-surface-container-high">
                            Load More Clips
                        </button>
                    </div>
                </div>

                {/* Side panel */}
                <div className="flex flex-col gap-5 lg:col-span-4">
                    <div className="flex flex-col gap-4 rounded-xl bg-surface-container-low p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[20px] text-primary">calendar_view_week</span>
                                <h2 className="text-lg font-semibold">Weekly Mood Rhythm</h2>
                            </div>
                            <span className="font-mono text-[11px] text-on-surface-variant uppercase">Oct 14–18</span>
                        </div>
                        <p className="text-sm text-on-surface-variant">
                            Hover over each day's mood node to preview your primary speech
                            sentiment pattern.
                        </p>
                        <div className="grid grid-cols-5 gap-1.5 pt-2 pb-1 text-center">
                            {WEEK.map((d) => (
                                <div key={d.day} className="group relative flex cursor-pointer flex-col items-center gap-1.5">
                                    <span className={`font-mono text-[11px] uppercase ${d.active ? 'font-bold text-primary' : 'text-on-surface-variant'}`}>
                                        {d.day}
                                    </span>
                                    <div className={`flex h-11 w-11 items-center justify-center rounded-full text-xl shadow-sm transition-all group-hover:scale-110 ${d.bg}`}>
                                        {d.emoji}
                                    </div>
                                    <span className={`text-xs ${d.active ? 'font-bold text-primary' : 'font-semibold text-on-surface'}`}>
                                        {d.label}
                                    </span>
                                    <div className="pointer-events-none absolute bottom-full z-20 mb-2 hidden w-32 flex-col rounded-lg bg-inverse-surface p-1.5 text-left text-inverse-on-surface shadow-xl group-hover:flex">
                                        <span className="text-xs font-semibold">{d.tip1}</span>
                                        <span className="font-mono text-[11px] opacity-80">{d.tip2}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-1 flex flex-col gap-1.5 rounded-lg bg-surface-container p-4">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-on-surface">Weekly Balance</span>
                                <span className="text-tertiary">85% Harmonious</span>
                            </div>
                            <div className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full">
                                <div className="h-full bg-primary" style={{ width: '50%' }} />
                                <div className="h-full bg-secondary" style={{ width: '30%' }} />
                                <div className="h-full bg-primary-container" style={{ width: '20%' }} />
                            </div>
                            <div className="flex items-center justify-between pt-1 font-mono text-[11px] text-on-surface-variant">
                                <span>50% Joy</span>
                                <span>30% Calm</span>
                                <span>20% High Energy</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex flex-col gap-2 overflow-hidden rounded-xl bg-surface-container-high/60 p-5 shadow-sm">
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                            <span>Acoustic Journal Insight</span>
                        </div>
                        <p className="text-sm leading-relaxed text-on-surface-variant">
                            Your voice carries 18% higher inflection and warmth when recording
                            before noon compared to afternoon sessions. Mornings are prime for
                            presentations.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 rounded-xl bg-surface-container-low p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[20px] text-secondary">cloud_sync</span>
                                <h2 className="text-lg font-semibold">Export &amp; Backup</h2>
                            </div>
                            <span className="h-2 w-2 rounded-full bg-tertiary" />
                        </div>
                        <p className="text-sm text-on-surface-variant">
                            Keep your private voice diary safe. Download your raw audio
                            recordings or archive transcripts with mood tags.
                        </p>
                        {[
                            { icon: 'folder_zip', color: 'text-primary', label: 'Download Audio Archive (.zip)', meta: '42 MB' },
                            { icon: 'description', color: 'text-secondary', label: 'Export Mood Notes & Data', meta: 'CSV / PDF' },
                            { icon: 'sync', color: 'text-tertiary', label: 'Auto-Sync to Google Drive', meta: 'Active', active: true },
                        ].map((item) => (
                            <button
                                key={item.label}
                                className="flex w-full items-center justify-between rounded-xl bg-surface-container-lowest px-4 py-2.5 text-sm shadow-sm transition-all hover:bg-surface-container-high"
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className={`material-symbols-outlined text-[20px] ${item.color}`}>{item.icon}</span>
                                    <span className="font-semibold">{item.label}</span>
                                </div>
                                <span className={`${item.active ? 'font-semibold text-primary' : 'font-mono text-[11px]'} text-on-surface-variant`}>
                                    {item.meta}
                                </span>
                            </button>
                        ))}
                        <div className="flex items-center justify-between border-t border-outline-variant/30 pt-3 font-mono text-[11px] text-on-surface-variant">
                            <span>Last backup: Today, 08:30 AM</span>
                            <span className="text-tertiary">All streams encrypted</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}