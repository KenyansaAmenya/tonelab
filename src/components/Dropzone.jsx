import { useRef, useState } from 'react'

const MAX_SIZE = 25 * 1024 * 1024 // 25MB

export default function Dropzone({ onFile }) {
    const inputRef = useRef(null)
    const [dragging, setDragging] = useState(false)
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')

    const isAudioFile = (f) =>
        f.type.startsWith('audio/') || /\.(mp3|wav|m4a|flac)$/i.test(f.name)

    const handleFile = (f) => {
        if (!f) return
        if (!isAudioFile(f)) {
            setError('Please choose an audio file (MP3, WAV, M4A, or FLAC).')
            return
        }
        if (f.size > MAX_SIZE) {
            setError('File is larger than 25MB.')
            return
        }
        setError('')
        setFile(f)
        onFile?.(f)
    }

    const onDrop = (e) => {
        e.preventDefault()
        setDragging(false)
        handleFile(e.dataTransfer.files?.[0])
    }

    const formatSize = (bytes) =>
        bytes > 1024 * 1024
            ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
            : `${Math.round(bytes / 1024)} KB`

    return (
        <div>
            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault()
                    setDragging(true)
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={`flex cursor-pointer flex-col items-center rounded-xl bg-surface-container-lowest p-8 text-center transition-all ${dragging
                        ? 'bg-primary-fixed/30 ring-2 ring-primary'
                        : 'hover:bg-surface-container-low'
                    }`}
            >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary-fixed/40 text-primary">
                    <span className="material-symbols-outlined text-[28px]">
                        {dragging ? 'download' : 'cloud_upload'}
                    </span>
                </div>

                {file ? (
                    <>
                        <p className="mb-1 flex items-center gap-2 text-lg font-medium">
                            <span className="material-symbols-outlined text-[20px] text-tertiary">
                                check_circle
                            </span>
                            {file.name}
                        </p>
                        <p className="text-sm text-on-surface-variant">
                            {formatSize(file.size)} • Click or drop to replace
                        </p>
                    </>
                ) : (
                    <>
                        <p className="mb-1 text-lg font-medium">
                            Drop audio file here, or browse files
                        </p>
                        <p className="max-w-sm text-sm text-on-surface-variant">
                            WAV, MP3, M4A, or FLAC up to 25MB. Audio is processed on-device
                            with zero server retention.
                        </p>
                    </>
                )}

                <div className="mt-4 flex items-center gap-1.5">
                    <span className="rounded bg-surface-container px-2 py-0.5 font-mono text-[11px] text-on-surface-variant">
                        44.1 - 96 kHz
                    </span>
                    <span className="rounded bg-surface-container px-2 py-0.5 font-mono text-[11px] text-on-surface-variant">
                        Stereo / Mono
                    </span>
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="audio/*,.mp3,.wav,.m4a,.flac"
                    className="hidden"
                    onChange={(e) => {
                        handleFile(e.target.files?.[0])
                        e.target.value = '' // allow re-selecting the same file
                    }}
                />
            </div>

            {error && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-error">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    {error}
                </p>
            )}
        </div>
    )
}