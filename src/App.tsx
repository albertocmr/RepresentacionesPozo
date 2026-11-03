import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, CheckCircle2, ChevronDown, Factory, Menu, Store, X } from 'lucide-react'
import { brands, contact, sectors } from './data'
import { Counter, LineReveal, Marquee, Reveal, WordRotator, Waves, ease } from './motion'

const navLinks = [['Inicio', '/'], ['Sobre nosotros', '/sobre-nosotros'], ['Firmas representadas', '/firmas-representadas'], ...sectors.map(s => [s.title, s.path]), ['Contacto', '/contacto']]
const telHref = (phone: string) => `tel:+34${phone.replace(/\s/g, '')}`

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" className="brand-lockup" onClick={onClick} aria-label="Representaciones Pozo, ir al inicio">
      <img src="/logo-mark.png" alt="" width="74" height="56" />
      <span className="brand-name"><strong>POZO</strong>REPRESENTACIONES</span>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { scrollY, scrollYProgress } = useScroll()
  useMotionValueEvent(scrollY, 'change', v => setScrolled(v > 24))
  const close = () => setOpen(false)
  useEffect(() => { setOpen(false) }, [location.pathname])
  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-wrap">
        <Logo onClick={close} />
        <nav className="desktop-nav" aria-label="Navegación principal">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/sobre-nosotros">Sobre nosotros</NavLink>
          <NavLink to="/firmas-representadas">Firmas</NavLink>
          <div className="nav-dropdown">
            <span tabIndex={0} aria-haspopup="true">Sectores <ChevronDown size={13} /></span>
            <div className="dropdown-menu">{sectors.map(s => <Link key={s.path} to={s.path}><span>{s.number}</span>{s.title}</Link>)}</div>
          </div>
          <NavLink to="/contacto">Contacto</NavLink>
        </nav>
        <Link className="nav-cta" to="/contacto">Hablemos <ArrowUpRight size={16} /></Link>
        <button className="mobile-toggle" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <m.nav id="mobile-nav" className="mobile-nav" aria-label="Navegación móvil" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }}>
            {navLinks.map(([label, path], i) => (
              <m.div key={path} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04, ease }}>
                <Link to={path} onClick={close}>{label}<ArrowUpRight size={16} /></Link>
              </m.div>
            ))}
          </m.nav>
        )}
      </AnimatePresence>
      <m.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
    </header>
  )
}

function BackToTop() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  useMotionValueEvent(scrollY, 'change', v => setVisible(v > 700))
  return (
    <AnimatePresence>
      {visible && (
        <m.button className="back-to-top" aria-label="Volver arriba" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}>
          <ArrowUp size={18} />
        </m.button>
      )}
    </AnimatePresence>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <Waves className="footer-waves" />
      <div className="container">
        <div className="footer-top">
          <div>
            <Link to="/" aria-label="Representaciones Pozo, ir al inicio"><img className="footer-logo" src="/logo-white.png" alt="Pozo Representaciones" width="190" height="190" loading="lazy" /></Link>
            <p className="footer-about">Conectamos fabricantes y profesionales. Experiencia, cercanía y conocimiento del mercado.</p>
          </div>
          <div><span className="footer-label">Explora</span><Link to="/sobre-nosotros">Sobre nosotros</Link><Link to="/firmas-representadas">Firmas representadas</Link>{sectors.map(s => <Link key={s.path} to={s.path}>{s.title}</Link>)}<Link to="/contacto">Contacto</Link></div>
          <div><span className="footer-label">Contacto</span><p>{contact.address}</p>{contact.phones.map(p => <a key={p} href={telHref(p)}>{p}</a>)}<a href={`mailto:${contact.emails[0]}`}>{contact.emails[0]}</a><p>{contact.hours}</p></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Representaciones Pozo · Propuesta de rediseño</span><span>Versión de demostración · No es la web oficial</span></div>
      </div>
    </footer>
  )
}

function PageTitle({ children }: { children?: string }) { return <title>{children ? `${children} | Representaciones Pozo` : 'Representaciones Pozo | Experiencia que conecta'}</title> }
function SectionLabel({ children }: { children: string }) { return <div className="section-label"><span />{children}</div> }
function ButtonLink({ to, children, light = false }: { to: string; children: ReactNode; light?: boolean }) { return <Link className={`button ${light ? 'button-light' : ''}`} to={to}><span>{children}</span><ArrowUpRight size={17} /></Link> }

function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  return <>
    <PageTitle />
    <section className="hero" ref={heroRef}>
      <m.div className="hero-parallax" style={{ y: imageY }}><div className="hero-image" /></m.div>
      <div className="hero-shade" />
      <m.div className="container hero-content" style={{ y: contentY, opacity: contentOpacity }}>
        <m.div className="eyebrow light-eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease, delay: 0.1 }}><span /> REPRESENTACIÓN COMERCIAL · MÁLAGA</m.div>
        <LineReveal as="h1" delay={0.2} lines={['Conectamos marcas.', <><em>Impulsamos</em> negocios.</>]} />
        <m.p className="hero-lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.6 }}>Más de 40 años acercando soluciones, fabricantes y oportunidades al sector industrial y de la construcción.</m.p>
        <m.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.75 }}>
          <ButtonLink to="/firmas-representadas" light>Descubre nuestras firmas</ButtonLink>
          <Link to="/contacto" className="text-link light-link">Contacta con nosotros <ArrowRight size={16} /></Link>
        </m.div>
      </m.div>
      <m.div className="hero-stamp" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease, delay: 0.9 }}>
        <strong><Counter to={40} /><span>+</span></strong><small>AÑOS DE<br />EXPERIENCIA</small>
      </m.div>
      <div className="container hero-bottom">
        <span>ESPECIALISTAS EN · <WordRotator words={sectors.map(s => s.title.toUpperCase())} /></span>
        <a href="#intro">DESCUBRE POZO <ArrowDown size={14} className="bounce" /></a>
      </div>
      <Waves className="hero-waves" />
    </section>

    <section className="intro section-pad" id="intro">
      <div className="container intro-grid">
        <Reveal><SectionLabel>QUIÉNES SOMOS</SectionLabel><LineReveal lines={['Experiencia, confianza', <>y <em>representación.</em></>]} /></Reveal>
        <Reveal className="intro-copy" delay={0.15}>
          <p className="lead">En Representaciones Pozo trabajamos conectando fabricantes de referencia con distribuidores y profesionales de los sectores de construcción, industria, ferretería y seguridad laboral.</p>
          <p>Conocemos el mercado, entendemos las necesidades de cada canal y construimos relaciones comerciales duraderas.</p>
          <ButtonLink to="/sobre-nosotros">Conoce nuestra historia</ButtonLink>
        </Reveal>
      </div>
      <div className="container stats">
        <Reveal><strong><Counter to={40} /><span>+</span></strong><small>AÑOS DE TRAYECTORIA</small></Reveal>
        <Reveal delay={0.1}><strong><Counter to={brands.length} /></strong><small>FIRMAS REPRESENTADAS</small></Reveal>
        <Reveal delay={0.2}><strong><Counter to={sectors.length} pad={2} /></strong><small>ÁREAS DE ESPECIALIZACIÓN</small></Reveal>
      </div>
    </section>

    <Marquee items={brands.map(b => b.name)} label="Algunas de las firmas que representamos" />

    <section className="sectors-section section-pad">
      <div className="container">
        <div className="section-heading">
          <Reveal><SectionLabel>ÁREAS DE ACTIVIDAD</SectionLabel><LineReveal lines={['Especialistas en', <em>cada sector.</em>]} /></Reveal>
          <Reveal delay={0.15}><p>Una red de soluciones y fabricantes para acompañar a los profesionales en cada proyecto.</p></Reveal>
        </div>
        <div className="sector-grid">
          {sectors.map((s, i) => (
            <Reveal key={s.path} className="sector-card" delay={i * 0.12}>
              <Link to={s.path}>
                <div className="sector-photo-wrap"><div className="sector-photo" style={{ backgroundImage: `url(${s.image})` }} /></div>
                <div className="sector-card-content">
                  <span className="sector-number">{s.number} / {String(sectors.length).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="circle-arrow"><ArrowUpRight /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="audience-section section-pad">
      <div className="container">
        <Reveal className="audience-heading"><SectionLabel>CÓMO TE AYUDAMOS</SectionLabel><LineReveal lines={['Un puente entre', <em>quien fabrica y quien vende.</em>]} /></Reveal>
        <div className="audience-grid">
          {[
            { icon: <Factory />, title: 'Para fabricantes', text: 'Llevamos tu producto al canal profesional con una presencia comercial constante y cercana.', points: ['Red de distribuidores y clientes profesionales', 'Presentación y seguimiento de producto', 'Información de mercado de primera mano'] },
            { icon: <Store />, title: 'Para distribuidores', text: 'Un único interlocutor para acceder a un catálogo multimarca especializado.', points: ['Catálogo amplio de fabricantes de referencia', 'Asesoramiento técnico y comercial', 'Atención ágil y personalizada'] },
          ].map((card, i) => (
            <Reveal key={card.title} className="audience-card" delay={i * 0.15}>
              <span className="audience-icon">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <ul>{card.points.map(p => <li key={p}><CheckCircle2 />{p}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="brands-section section-pad">
      <div className="container brands-layout">
        <Reveal>
          <SectionLabel>RED DE FABRICANTES</SectionLabel>
          <LineReveal lines={['Marcas que', <em>marcan la diferencia.</em>]} />
          <p className="body-copy">Colaboramos con fabricantes especializados para ofrecer un catálogo amplio y soluciones adaptadas a las necesidades del mercado profesional.</p>
          <ButtonLink to="/firmas-representadas">Ver todas las firmas</ButtonLink>
        </Reveal>
        <div className="brand-wall">
          {brands.slice(0, 12).map((b, i) => (
            <m.div className="brand-tile" key={b.name} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, ease, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.06 }}>
              <span>{b.name}</span><small>{String(i + 1).padStart(2, '0')}</small>
            </m.div>
          ))}
        </div>
      </div>
    </section>

    <ValuesSection />
    <Callout />
  </>
}

function ValuesSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const markY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const values = [
    ['Conocimiento del mercado', 'Experiencia y especialización al servicio de fabricantes y distribuidores.'],
    ['Relaciones duraderas', 'Construimos vínculos basados en la confianza, la profesionalidad y el compromiso.'],
    ['Atención cercana', 'Acompañamiento comercial y conocimiento de las necesidades de cada cliente.'],
  ]
  return (
    <section className="values-section" ref={ref}>
      <m.img className="values-watermark" src="/logo-mark-white.png" alt="" style={{ y: markY }} loading="lazy" />
      <div className="container values-inner">
        <Reveal><SectionLabel>LO QUE NOS DEFINE</SectionLabel><LineReveal lines={['Mucho más que', <em>representar marcas.</em>]} /></Reveal>
        <div className="values-list">
          {values.map(([title, text], i) => (
            <Reveal key={title} delay={i * 0.12}>
              <span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div><CheckCircle2 />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Callout() {
  return (
    <section className="callout">
      <Waves className="callout-waves" />
      <div className="container callout-inner">
        <Reveal><SectionLabel>HABLEMOS DE OPORTUNIDADES</SectionLabel><h2>¿Buscas nuevas oportunidades<br />para tu <em>negocio?</em></h2></Reveal>
        <Reveal delay={0.15}><ButtonLink to="/contacto">Estamos aquí para ayudarte</ButtonLink></Reveal>
      </div>
    </section>
  )
}

function PageHero({ kicker, title, sub, image }: { kicker: string; title: ReactNode[]; sub: string; image: string }) {
  return (
    <section className="page-hero">
      <div className="page-hero-image" style={{ backgroundImage: `url(${image})` }} />
      <div className="page-hero-shade" />
      <div className="container page-hero-content">
        <m.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease }}><SectionLabel>{kicker}</SectionLabel></m.div>
        <LineReveal as="h1" delay={0.1} lines={title} />
        <m.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.45 }}>{sub}</m.p>
      </div>
      <Waves className="hero-waves" />
    </section>
  )
}

function About() {
  return <>
    <PageTitle>Sobre nosotros</PageTitle>
    <PageHero kicker="SOBRE REPRESENTACIONES POZO" title={['Una trayectoria construida', <em>junto al mercado.</em>]} sub="Experiencia, conocimiento y relaciones comerciales que generan confianza." image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80" />
    <section className="section-pad">
      <div className="container intro-grid">
        <Reveal><SectionLabel>NUESTRA HISTORIA</SectionLabel><LineReveal lines={['Con raíces en Málaga', <>y mirada al <em>futuro.</em></>]} /></Reveal>
        <Reveal className="intro-copy" delay={0.15}>
          <p className="lead">Representaciones Pozo cuenta con una trayectoria de más de cuatro décadas en el ámbito de la representación comercial.</p>
          <p>Durante este tiempo, la empresa ha desarrollado relaciones con fabricantes, distribuidores y profesionales de distintos sectores, trabajando para acercar productos y soluciones al mercado.</p>
          <p>Esta propuesta de web presenta una nueva forma de contar esa experiencia: clara, actual y centrada en las personas y empresas con las que trabaja.</p>
        </Reveal>
      </div>
    </section>
    <section className="about-band">
      <div className="container about-band-grid">
        <Reveal className="about-photo-wrap"><div className="about-photo" /><img className="about-badge" src="/logo-mark.png" alt="" loading="lazy" /></Reveal>
        <Reveal delay={0.15}>
          <SectionLabel>NUESTRA FORMA DE TRABAJAR</SectionLabel>
          <LineReveal lines={['Conocer. Conectar.', <em>Avanzar.</em>]} />
          <p>Entendemos la representación como una relación a largo plazo. Escuchamos al mercado, conocemos las soluciones de nuestros fabricantes y trabajamos para que cada conexión aporte valor.</p>
        </Reveal>
      </div>
      <div className="container steps">
        {[
          ['Conocer', 'Escuchamos a fabricantes y clientes para entender qué necesita cada canal.'],
          ['Conectar', 'Presentamos el producto adecuado al profesional adecuado, con información clara.'],
          ['Avanzar', 'Acompañamos cada operación y cuidamos la relación más allá del pedido.'],
        ].map(([title, text], i) => (
          <Reveal key={title} className="step" delay={i * 0.12}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></Reveal>
        ))}
      </div>
    </section>
    <Callout />
  </>
}

function Brands() {
  const [filter, setFilter] = useState('Todos')
  const [search, setSearch] = useState('')
  const filters = ['Todos', ...sectors.map(s => s.title)]
  const shown = brands.filter(b => (filter === 'Todos' || b.sectors.includes(filter)) && b.name.toLowerCase().includes(search.trim().toLowerCase()))
  return <>
    <PageTitle>Firmas representadas</PageTitle>
    <PageHero kicker="NUESTRAS FIRMAS" title={['Fabricantes de confianza.', <em>Soluciones profesionales.</em>]} sub="Una selección de marcas vinculadas a los sectores en los que desarrollamos nuestra actividad." image="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=80" />
    <section className="section-pad">
      <div className="container">
        <div className="brand-tools">
          <Reveal><SectionLabel>DIRECTORIO DE FIRMAS</SectionLabel><h2>Una red de <em>especialistas.</em></h2></Reveal>
          <input value={search} onChange={e => setSearch(e.target.value)} type="search" placeholder="Buscar marca..." aria-label="Buscar marca" />
        </div>
        <div className="filter-row">
          {filters.map(f => <button key={f} type="button" className={filter === f ? 'active' : ''} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}
        </div>
        <p className="result-count" role="status">{shown.length} {shown.length === 1 ? 'firma' : 'firmas'}</p>
        <div className="directory-grid" key={filter}>
          {shown.map((b, i) => (
            <m.div className="directory-card" key={b.name} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease, delay: Math.min(i * 0.025, 0.4) }}>
              <span>{String(i + 1).padStart(2, '0')}</span><strong>{b.name}</strong><small>{b.sectors.join(' · ')}</small>
            </m.div>
          ))}
        </div>
        {shown.length === 0 && <p className="demo-note">No hay firmas que coincidan con la búsqueda.</p>}
        <p className="demo-note">Directorio de referencia basado en la información disponible en la web actual. Las relaciones y categorías deben validarse antes de publicar.</p>
      </div>
    </section>
    <Callout />
  </>
}

function SectorPage({ index }: { index: number }) {
  const sector = sectors[index]
  const related = brands.filter(b => b.sectors.includes(sector.title))
  const others = sectors.filter((_, i) => i !== index)
  return <>
    <PageTitle>{sector.title}</PageTitle>
    <PageHero kicker={`SECTORES · ${sector.number}`} title={[sector.title, <em>para profesionales.</em>]} sub={sector.text} image={sector.image} />
    <section className="section-pad">
      <div className="container sector-detail">
        <Reveal><SectionLabel>ESPECIALIZACIÓN</SectionLabel><LineReveal lines={['Soluciones para', <em>el trabajo real.</em>]} /></Reveal>
        <Reveal delay={0.15}>
          <p className="lead">{sector.text}</p>
          <p>Representamos fabricantes y acercamos sus soluciones a distribuidores y profesionales. Nuestro conocimiento del sector nos permite ofrecer una interlocución cercana y orientada a las necesidades del mercado.</p>
        </Reveal>
      </div>
    </section>
    <section className="related-brands">
      <div className="container">
        <Reveal><SectionLabel>FIRMAS RELACIONADAS</SectionLabel><h2>Marcas del <em>sector.</em></h2></Reveal>
        <div className="related-grid">
          {related.map((b, i) => (
            <m.div key={b.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, ease, delay: Math.min(i * 0.04, 0.4) }}>{b.name}<ArrowUpRight size={15} /></m.div>
          ))}
        </div>
        <p className="demo-note">Listado de referencia pendiente de validación comercial.</p>
        <div className="other-sectors">
          <span>OTROS SECTORES</span>
          {others.map(s => <Link key={s.path} to={s.path}>{s.title} <ArrowRight size={15} /></Link>)}
        </div>
      </div>
    </section>
    <Callout />
  </>
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [values, setValues] = useState({ name: '', company: '', email: '', phone: '', subject: '', message: '', privacy: false })
  const update = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setValues(v => ({ ...v, [e.target.name]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }))
  const errors = { name: !values.name.trim(), email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email), message: !values.message.trim(), privacy: !values.privacy }
  const valid = !Object.values(errors).some(Boolean)
  const submit = (e: FormEvent) => { e.preventDefault(); setAttempted(true); if (valid) setSubmitted(true) }
  return <>
    <PageTitle>Contacto</PageTitle>
    <PageHero kicker="CONTACTO" title={['Hablemos de', <em>tu próximo proyecto.</em>]} sub="Estamos a tu disposición para atender consultas de fabricantes, distribuidores y profesionales." image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80" />
    <section className="section-pad">
      <div className="container contact-grid">
        <Reveal className="contact-info">
          <SectionLabel>ESTAMOS CERCA</SectionLabel>
          <h2>Conectemos<br /><em>ideas y negocio.</em></h2>
          <p className="body-copy">Puedes contactar con nuestro equipo a través de los siguientes canales.</p>
          <div className="contact-item"><span>VISÍTANOS</span><p>{contact.address}</p></div>
          <div className="contact-item"><span>LLÁMANOS</span>{contact.phones.map(p => <a key={p} href={telHref(p)}>{p}</a>)}</div>
          <div className="contact-item"><span>ESCRÍBENOS</span>{contact.emails.map(e => <a key={e} href={`mailto:${e}`}>{e}</a>)}</div>
          <div className="contact-item"><span>HORARIO</span><p>{contact.hours}</p></div>
          <a className="map-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`} target="_blank" rel="noopener noreferrer">Ver ubicación en Google Maps <ArrowUpRight size={15} /></a>
        </Reveal>
        <Reveal className="form-panel" delay={0.15}>
          <div className="form-heading"><span>FORMULARIO DE CONTACTO</span><p>Cuéntanos qué necesitas y nos pondremos en contacto contigo.</p></div>
          <AnimatePresence mode="wait" initial={false}>
            {submitted ? (
              <m.div key="ok" className="form-success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }}>
                <m.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.1 }}><CheckCircle2 size={44} /></m.span>
                <h3>¡Gracias por tu interés!</h3>
                <p>Esta es una demostración: el formulario no envía información. En la web definitiva se conectará a un servicio de envío seguro.</p>
                <button type="button" onClick={() => { setSubmitted(false); setAttempted(false) }}>Enviar otra consulta</button>
              </m.div>
            ) : (
              <m.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="form-row">
                  <label>Nombre *<input name="name" autoComplete="name" required aria-invalid={attempted && errors.name} value={values.name} onChange={update} placeholder="Tu nombre" /></label>
                  <label>Empresa<input name="company" autoComplete="organization" value={values.company} onChange={update} placeholder="Nombre de empresa" /></label>
                </div>
                <div className="form-row">
                  <label>Email *<input name="email" type="email" autoComplete="email" required aria-invalid={attempted && errors.email} value={values.email} onChange={update} placeholder="nombre@empresa.com" /></label>
                  <label>Teléfono<input name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={update} placeholder="+34 600 000 000" /></label>
                </div>
                <label>Asunto<select name="subject" value={values.subject} onChange={update}><option value="">Selecciona una opción</option><option>Información comercial</option><option>Fabricantes</option><option>Distribución</option><option>Otra consulta</option></select></label>
                <label>Mensaje *<textarea name="message" required aria-invalid={attempted && errors.message} value={values.message} onChange={update} placeholder="Escribe aquí tu consulta..." rows={5} /></label>
                <label className="privacy"><input type="checkbox" name="privacy" required aria-invalid={attempted && errors.privacy} checked={values.privacy} onChange={update} /> He leído y acepto la política de privacidad.</label>
                {attempted && !valid && <m.p className="form-error" role="alert" initial={{ x: -6 }} animate={{ x: [6, -4, 2, 0] }} transition={{ duration: 0.35 }}>Revisa los campos obligatorios, el email y el consentimiento.</m.p>}
                <button className="button form-submit" type="submit"><span>Enviar consulta</span><ArrowUpRight size={17} /></button>
                <p className="form-disclaimer">Formulario demostrativo: no se transmiten ni almacenan los datos introducidos.</p>
              </m.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
    <Callout />
  </>
}

function NotFound() {
  return (
    <div className="not-found"><PageTitle>Página no encontrada</PageTitle>
      <div className="container"><span>404</span><h1>Página no encontrada</h1><ButtonLink to="/">Volver al inicio</ButtonLink></div>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#main">Saltar al contenido</a>
        <Header />
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <m.main id="main" key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/sobre-nosotros" element={<About />} />
              <Route path="/firmas-representadas" element={<Brands />} />
              {sectors.map((s, i) => <Route key={s.path} path={s.path} element={<SectorPage index={i} />} />)}
              <Route path="/contacto" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </m.main>
        </AnimatePresence>
        <Footer />
        <BackToTop />
      </MotionConfig>
    </LazyMotion>
  )
}
