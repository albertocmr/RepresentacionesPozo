import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, animate, m, useInView, useReducedMotion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1] as const

/** Aparece con un desplazamiento suave al entrar en pantalla. */
export function Reveal({ children, className, delay = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, ease, delay }}
    >
      {children}
    </m.div>
  )
}

/** Titular que se revela línea a línea, como si emergiera de una máscara. */
export function LineReveal({ lines, className, delay = 0, as = 'h2' }: { lines: ReactNode[]; className?: string; delay?: number; as?: 'h1' | 'h2' }) {
  const Tag = as === 'h1' ? m.h1 : m.h2
  return (
    <Tag className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} transition={{ staggerChildren: 0.12, delayChildren: delay }}>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <m.span className="line-inner" variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, ease } } }}>
            {line}
          </m.span>
        </span>
      ))}
    </Tag>
  )
}

/** Contador que sube desde 0 cuando entra en pantalla. */
export function Counter({ to, pad = 0, duration = 1.8 }: { to: number; pad?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduce) { setValue(to); return }
    const controls = animate(0, to, { duration, ease, onUpdate: v => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduce, to, duration])
  return <><span ref={ref} aria-hidden="true">{String(value).padStart(pad, '0')}</span><span className="sr-only">{String(to).padStart(pad, '0')}</span></>
}

/** Palabra que rota cada pocos segundos. */
export function WordRotator({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % words.length), interval)
    return () => clearInterval(timer)
  }, [words.length, interval])
  return (
    <span className="rotator" aria-live="off">
      <AnimatePresence mode="wait" initial={false}>
        <m.span key={words[index]} initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.45, ease }}>
          {words[index]}
        </m.span>
      </AnimatePresence>
    </span>
  )
}

/** Cinta infinita de nombres; la segunda copia solo existe para cerrar el bucle. */
export function Marquee({ items, label }: { items: string[]; label: string }) {
  return (
    <div className="marquee" role="region" aria-label={label}>
      <div className="marquee-track">
        {[0, 1].map(copy => (
          <ul key={copy} aria-hidden={copy === 1 || undefined}>
            {items.map(item => <li key={item}>{item}</li>)}
          </ul>
        ))}
      </div>
    </div>
  )
}

/** Olas animadas inspiradas en las del logotipo. */
export function Waves({ className = '' }: { className?: string }) {
  const d = 'M0 40 C180 10 180 70 360 40 C540 10 540 70 720 40 C900 10 900 70 1080 40 C1260 10 1260 70 1440 40 C1620 10 1620 70 1800 40 C1980 10 1980 70 2160 40'
  return (
    <svg className={`waves ${className}`} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path className="wave wave-a" d={d} />
      <g transform="translate(0 16)"><path className="wave wave-b" d={d} /></g>
    </svg>
  )
}
