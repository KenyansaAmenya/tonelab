export const EMOTIONS = {
    happy: {
        emoji: "😊",
        label: "Joyful / Uplifting",
        text: "text-primary",
        bar: "bg-primary",
        desc: "The speaker sounds warm, upbeat, and engaged, with melodic pitch rises that indicate enthusiasm.",
    },
    neutral: {
        emoji: "😐",
        label: "Calm / Steady",
        text: "text-secondary",
        bar: "bg-secondary",
        desc: "The speaker maintains a measured, resonant cadence with balanced breath intervals — composed and focused.",
    },
    angry: {
        emoji: "😠",
        label: "Intense / Strained",
        text: "text-error",
        bar: "bg-error",
        desc: "The speaker exhibits elevated dynamic vocal pressure and abbreviated vowel closures — urgent, forceful delivery.",
    },
    sad: {
        emoji: "😢",
        label: "Soft / Heavy",
        text: "text-tertiary",
        bar: "bg-tertiary",
        desc: "The voice carries slower pacing, reduced energy, and downward pitch contours — a low, weighty tone.",
    },
    fearful: {
        emoji: "😨",
        label: "Tense / Uneasy",
        text: "text-primary-container",
        bar: "bg-primary-container",
        desc: "The speaker shows irregular rhythm and strained, wavering pitch — signs of tension and hesitancy.",
    },
    disgust: {
        emoji: "🤢",
        label: "Harsh / Dismissive",
        text: "text-tertiary",
        bar: "bg-tertiary-container",
        desc: "The voice has constricted, rough timbre with clipped articulation — a distinctly disengaged tone.",
    },
};

export const DISCLAIMER =
    "ToneLab analyzes how vocal sound patterns compare to acted recordings (RAVDESS), not what someone is truly feeling inside. Always consider the whole context.";