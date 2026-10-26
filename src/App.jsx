import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Analyze from './pages/Analyze.jsx'
import Recordings from './pages/Recordings.jsx'
import HowItWorks from './pages/HowItWorks.jsx'

export default function App() {
    const [page, setPage] = useState('analyze')
    const [dark, setDark] = useState(
        () => localStorage.getItem('tonelab-theme') === 'dark'
    )

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark)
        localStorage.setItem('tonelab-theme', dark ? 'dark' : 'light')
    }, [dark])

    return (
        <div className="min-h-screen bg-surface font-sans text-on-surface antialiased">
            <Header
                page={page}
                onNavigate={setPage}
                dark={dark}
                onToggleTheme={() => setDark((d) => !d)}
            />
            <main className="pt-16">
                {page === 'analyze' && <Analyze />}
                {page === 'recordings' && <Recordings />}
                {page === 'how' && <HowItWorks onNavigate={setPage} />}
            </main>
            <Footer />
        </div>
    )
}