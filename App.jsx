import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ArrowUp, ListOrdered, Volume2, VolumeX, X } from 'lucide-react'
import { chapters, finale, greeting } from './letter'

const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: '-6% 0px' }} transition={{ duration: 1, delay }}>
    {children}
  </motion.div>
)

function Petals({ count = 14 }) {
  const petals = useMemo(() => Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100, dur: 14 + Math.random() * 12, delay: -Math.random() * 20, s: 0.7 + Math.random() * 0.7
  })), [count])
  return <div aria-hidden="true">{petals.map((p, i) => (
    <span key={i} className="petal" style={{ left: p.left + 'vw', animationDuration: p.dur + 's', animationDelay: p.delay + 's', transform: `scale(${p.s})` }} />
  ))}</div>
}

function Envelope({ open }) {
  return (
    <div className="relative mx-auto h-44 w-64" style={{ perspective: 800 }}>
      <div className="absolute inset-0 rounded-sm bg-cream shadow-xl" />
      <motion.div className="absolute inset-x-5 bottom-3 top-5 bg-ivory shadow" animate={{ y: open ? -64 : 0 }} transition={{ duration: .8, delay: .35 }} />
      <div className="absolute inset-0 bg-[#E3D9CB]" style={{ clipPath: 'polygon(0 0,50% 55%,100% 0,100% 100%,0 100%)' }} />
      <motion.div className="absolute inset-x-0 top-0 h-24 origin-top bg-rose" style={{ clipPath: 'polygon(0 0,100% 0,50% 100%)' }}
        animate={{ rotateX: open ? 180 : 0 }} transition={{ duration: .8 }} />
    </div>
  )
}

function Opening({ onOpen }) {
  const [open, setOpen] = useState(false)
  const go = () => { setOpen(true); setTimeout(onOpen, 1400) }
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-12 px-6 text-center" style={{ background: 'linear-gradient(#E9E6EE,#F3E3E3 60%,#F8F4EC)' }}>
      <h1 className="font-serif text-4xl italic text-brown sm:text-5xl">{greeting}</h1>
      <Envelope open={open} />
      <button onClick={go} disabled={open} className="min-h-[48px] rounded-full border border-plum px-8 font-sans text-sm tracking-wide text-ink transition hover:bg-plum hover:text-ivory disabled:opacity-60">
        Open My Letter
      </button>
      <p className="absolute bottom-6 font-jp text-xs text-brown/70">君へ、最後の手紙 · To You, My Last Letter</p>
    </section>
  )
}

function Chapter({ c }) {
  return (
    <section id={c.id} className="relative overflow-hidden px-6 py-24 sm:py-32" style={{ background: c.bg }}>
      {c.sky && <Birds />}
      <div className={`mx-auto max-w-[34rem] ${c.paper ? 'rounded-sm bg-ivory/80 px-6 py-10 shadow-[0_8px_30px_rgba(120,102,92,.15)] sm:px-10' : ''}`}>
        <Reveal><h2 className="mb-12 font-serif text-3xl text-brown sm:text-4xl">{c.title}</h2></Reveal>
        {c.items.map((it, i) => typeof it === 'string'
          ? <Reveal key={i}><p className="mb-7 whitespace-pre-line text-[1.0625rem] leading-[1.9]">{it}</p></Reveal>
          : it.big
            ? <Reveal key={i} className="-mx-2 my-24 flex min-h-[45vh] items-center justify-center text-center"><p className="font-serif text-5xl italic leading-tight text-ink sm:text-7xl">{it.q}</p></Reveal>
            : <Reveal key={i}><p className="my-12 text-center font-serif text-2xl italic leading-snug text-brown sm:text-3xl">{it.q}</p></Reveal>)}
      </div>
    </section>
  )
}

function Birds() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute right-4 top-10 w-40 text-brown/50" viewBox="0 0 160 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path className="bird" d="M10 30 q8 -9 16 0 q8 -9 16 0" />
      <path className="bird" style={{ animationDelay: '-4s' }} d="M70 14 q6 -7 12 0 q6 -7 12 0" />
      <path className="bird" style={{ animationDelay: '-8s' }} d="M112 42 q5 -6 10 0 q5 -6 10 0" />
    </svg>
  )
}

function Finale() {
  return (
    <section id="finale" className="relative px-6 py-32 text-center" style={{ background: 'linear-gradient(#F8F4EC,#E4DDE6 25%,#D9B9BE 65%,#E9C9A8)' }}>
      <div className="mx-auto max-w-[36rem]">
        <Reveal><p className="font-jp text-xl leading-[2.2] text-ink sm:text-2xl">{finale.jp}</p></Reveal>
        <Reveal delay={.3}><p className="mt-10 font-sans text-xs italic leading-relaxed text-brown">{finale.romaji}</p></Reveal>
        <Reveal delay={.5}><p className="mt-8 font-serif text-xl italic leading-relaxed text-ink sm:text-2xl">“{finale.en}”</p></Reveal>
        <Reveal className="mt-24"><p className="font-jp text-2xl text-ink">{finale.closeJp}</p><p className="mt-3 font-serif text-xl italic text-brown">“{finale.closeEn}”</p></Reveal>
        <Reveal className="mt-28"><p className="whitespace-pre-line font-serif text-2xl italic text-ink">{finale.sign}</p><p className="mt-3 font-sans text-sm text-brown">{finale.date}</p></Reveal>
        <Reveal className="mt-24"><p className="font-serif text-base italic text-brown/90">{finale.small}</p></Reveal>
      </div>
    </section>
  )
}

function Nav() {
  const [show, setShow] = useState(false)
  const jump = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setShow(false) }
  return (
    <>
      <button aria-label="Chapters" onClick={() => setShow(!show)} className="fixed right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/90 text-brown shadow">
        {show ? <X size={18} /> : <ListOrdered size={18} />}
      </button>
      <AnimatePresence>{show && (
        <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed right-4 top-[3.75rem] z-30 max-h-[70vh] w-64 overflow-auto rounded-md bg-ivory p-2 shadow-lg">
          {[...chapters.map(c => [c.id, c.title]), ['finale', '高く羽ばたいて']].map(([id, t]) => (
            <button key={id} onClick={() => jump(id)} className="block min-h-[44px] w-full rounded px-3 text-left font-serif text-lg text-ink hover:bg-cream">{t}</button>
          ))}
        </motion.nav>
      )}</AnimatePresence>
    </>
  )
}

function Music() {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  const toggle = async () => {
    const a = ref.current
    if (on) { a.pause(); setOn(false) } else { try { await a.play(); setOn(true) } catch { setOn(false) } }
  }
  return (
    <>
      <audio ref={ref} src={import.meta.env.BASE_URL + 'music.mp3'} loop preload="none" />
      <button aria-label={on ? 'Mute music' : 'Play music'} onClick={toggle} className="fixed bottom-4 left-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/90 text-brown shadow">
        {on ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
    </>
  )
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [top, setTop] = useState(false)
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  useEffect(() => {
    const f = () => setTop(window.scrollY > 800)
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const start = () => { setOpened(true); window.scrollTo({ top: 0, behavior: 'auto' }) }
  return (
    <main>
      {!opened ? <Opening onOpen={start} /> : (
        <>
          <motion.div className="fixed left-0 top-0 z-40 h-[3px] w-full origin-left bg-plum" style={{ scaleX: bar }} />
          <Petals />
          <Nav />
          <Music />
          {chapters.map(c => <Chapter key={c.id} c={c} />)}
          <Finale />
          {top && (
            <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-4 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/90 text-brown shadow">
              <ArrowUp size={18} />
            </button>
          )}
        </>
      )}
    </main>
  )
}
