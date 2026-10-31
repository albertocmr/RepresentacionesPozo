import { useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, HardHat, Menu, ShieldCheck, Wrench, X } from 'lucide-react'
import { brands, contact, sectors } from './data'

const fade = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: .65, ease: [0.22, 1, 0.36, 1] } } } as const;

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const close = () => setOpen(false)
  return <header className="header">
    <div className="nav-wrap">
      <Link to="/" className="brand-lockup" onClick={close}><span className="brand-mark">P<span>.</span></span><span className="brand-name">REPRESENTACIONES<strong>POZO</strong></span></Link>
      <nav className="desktop-nav">
        <NavLink to="/">Inicio</NavLink><NavLink to="/sobre-nosotros">Sobre nosotros</NavLink><NavLink to="/firmas-representadas">Firmas</NavLink>
        <div className="nav-dropdown"><span>Sectores <ChevronDown size={13}/></span><div className="dropdown-menu">{sectors.map(s=><Link key={s.path} to={s.path}>{s.title}</Link>)}</div></div>
        <NavLink to="/contacto">Contacto</NavLink>
      </nav>
      <Link className="nav-cta" to="/contacto">Hablemos <ArrowUpRight size={16}/></Link>
      <button className="mobile-toggle" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </div>
    <AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}>
      {[['Inicio','/'],['Sobre nosotros','/sobre-nosotros'],['Firmas representadas','/firmas-representadas'],...sectors.map(s=>[s.title,s.path]),['Contacto','/contacto']].map(([label,path])=><Link key={path} to={path} onClick={close}>{label}<ArrowUpRight size={16}/></Link>)}
    </motion.nav>}</AnimatePresence>
    {location.pathname !== '/' && <div className="nav-progress"/>}
  </header>
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top">
    <div><Link to="/" className="brand-lockup light"><span className="brand-mark">P<span>.</span></span><span className="brand-name">REPRESENTACIONES<strong>POZO</strong></span></Link><p className="footer-about">Conectamos fabricantes y profesionales. Experiencia, cercanía y conocimiento del mercado.</p></div>
    <div><span className="footer-label">Explora</span><Link to="/sobre-nosotros">Sobre nosotros</Link><Link to="/firmas-representadas">Firmas representadas</Link><Link to="/contacto">Contacto</Link></div>
    <div><span className="footer-label">Contacto</span><p>{contact.address}</p><a href="tel:+34952330004">952 330 004</a><a href="mailto:info@representacionespozo.com">info@representacionespozo.com</a></div>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Representaciones Pozo · Propuesta de rediseño</span><span>Versión de demostración · No es la web oficial</span></div></div></footer>
}

function SectionLabel({children}:{children:string}) { return <div className="section-label"><span/>{children}</div> }
function ButtonLink({to,children,light=false}:{to:string;children:React.ReactNode;light?:boolean}) { return <Link className={`button ${light?'button-light':''}`} to={to}>{children}<ArrowUpRight size={17}/></Link> }

function Home() {
  return <>
    <section className="hero">
      <div className="hero-image"/>
      <div className="hero-shade"/>
      <div className="container hero-content">
        <motion.div initial="hidden" animate="show" variants={fade}>
          <div className="eyebrow light-eyebrow"><span/> REPRESENTACIÓN COMERCIAL · MÁLAGA</div>
          <h1>Conectamos marcas.<br/><em>Impulsamos</em> negocios.</h1>
          <p className="hero-lead">Más de 40 años acercando soluciones, fabricantes y oportunidades al sector industrial y de la construcción.</p>
          <div className="hero-actions"><ButtonLink to="/firmas-representadas" light>Descubre nuestras firmas</ButtonLink><Link to="/contacto" className="text-link light-link">Contacta con nosotros <ArrowRight size={16}/></Link></div>
        </motion.div>
        <div className="hero-bottom"><span>01 / 03 — EXPERIENCIA QUE CONECTA</span><a href="#intro">DESCUBRE POZO <ArrowDown size={14}/></a></div>
      </div>
      <div className="hero-stamp"><strong>40<span>+</span></strong><small>AÑOS DE<br/>EXPERIENCIA</small></div>
    </section>

    <section className="intro section-pad" id="intro"><div className="container intro-grid">
      <div><SectionLabel>QUIÉNES SOMOS</SectionLabel><h2>Experiencia, confianza<br/>y <em>representación.</em></h2></div>
      <div className="intro-copy"><p className="lead">En Representaciones Pozo trabajamos conectando fabricantes de referencia con distribuidores y profesionales de los sectores de construcción, industria, ferretería y seguridad laboral.</p><p>Conocemos el mercado, entendemos las necesidades de cada canal y construimos relaciones comerciales duraderas.</p><ButtonLink to="/sobre-nosotros">Conoce nuestra historia</ButtonLink></div>
    </div><div className="container stats"><div><strong>40<span>+</span></strong><small>AÑOS DE TRAYECTORIA</small></div><div><strong>03</strong><small>ÁREAS DE ESPECIALIZACIÓN</small></div><div><strong>B2B</strong><small>RELACIONES DE CONFIANZA</small></div></div></section>

    <section className="sectors-section section-pad"><div className="container"><div className="section-heading"><div><SectionLabel>ÁREAS DE ACTIVIDAD</SectionLabel><h2>Especialistas en<br/><em>cada sector.</em></h2></div><p>Una red de soluciones y fabricantes para acompañar a los profesionales en cada proyecto.</p></div>
      <div className="sector-grid">{sectors.map((s,i)=><motion.div key={s.path} className="sector-card" initial="hidden" whileInView="show" viewport={{once:true,amount:.2}} variants={fade}><Link to={s.path}><div className="sector-photo" style={{backgroundImage:`url(${s.image})`}}/><div className="sector-card-content"><span className="sector-number">{s.number} / 03</span><h3>{s.title}</h3><p>{s.text}</p><span className="circle-arrow"><ArrowUpRight/></span></div></Link></motion.div>)}</div>
    </div></section>

    <section className="brands-section section-pad"><div className="container brands-layout"><div><SectionLabel>RED DE FABRICANTES</SectionLabel><h2>Marcas que<br/><em>marcan la diferencia.</em></h2><p className="body-copy">Colaboramos con fabricantes especializados para ofrecer un catálogo amplio y soluciones adaptadas a las necesidades del mercado profesional.</p><ButtonLink to="/firmas-representadas">Ver todas las firmas</ButtonLink></div><div className="brand-wall">{brands.slice(0,12).map((b,i)=><div className="brand-tile" key={b.name}><span>{b.name}</span><small>{String(i+1).padStart(2,'0')}</small></div>)}</div></div></section>

    <section className="values-section"><div className="container values-inner"><div><SectionLabel>LO QUE NOS DEFINE</SectionLabel><h2>Mucho más que<br/><em>representar marcas.</em></h2></div><div className="values-list"><div><span>01</span><div><h3>Conocimiento del mercado</h3><p>Experiencia y especialización al servicio de fabricantes y distribuidores.</p></div><CheckCircle2/></div><div><span>02</span><div><h3>Relaciones duraderas</h3><p>Construimos vínculos basados en la confianza, la profesionalidad y el compromiso.</p></div><CheckCircle2/></div><div><span>03</span><div><h3>Atención cercana</h3><p>Acompañamiento comercial y conocimiento de las necesidades de cada cliente.</p></div><CheckCircle2/></div></div></div></section>
    <Callout/>
  </>
}

function Callout() { return <section className="callout"><div className="container callout-inner"><div><SectionLabel>HABLEMOS DE OPORTUNIDADES</SectionLabel><h2>¿Buscas nuevas oportunidades<br/>para tu <em>negocio?</em></h2></div><ButtonLink to="/contacto" light>Estamos aquí para ayudarte</ButtonLink></div></section> }

function PageHero({kicker,title,sub,image}:{kicker:string;title:React.ReactNode;sub:string;image:string}) { return <section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(9,28,45,.92),rgba(9,28,45,.52)),url(${image})`}}><div className="container"><SectionLabel>{kicker}</SectionLabel><h1>{title}</h1><p>{sub}</p></div></section> }

function About() {
  return <><PageHero kicker="SOBRE REPRESENTACIONES POZO" title={<>Una trayectoria construida<br/><em>junto al mercado.</em></>} sub="Experiencia, conocimiento y relaciones comerciales que generan confianza." image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85"/>
    <section className="section-pad"><div className="container intro-grid"><div><SectionLabel>NUESTRA HISTORIA</SectionLabel><h2>Con raíces en Málaga<br/>y mirada al <em>futuro.</em></h2></div><div className="intro-copy"><p className="lead">Representaciones Pozo cuenta con una trayectoria de más de cuatro décadas en el ámbito de la representación comercial.</p><p>Durante este tiempo, la empresa ha desarrollado relaciones con fabricantes, distribuidores y profesionales de distintos sectores, trabajando para acercar productos y soluciones al mercado.</p><p>Esta propuesta de web presenta una nueva forma de contar esa experiencia: clara, actual y centrada en las personas y empresas con las que trabaja.</p></div></div></section>
    <section className="about-band"><div className="container about-band-grid"><div className="about-photo"/><div><SectionLabel>NUESTRA FORMA DE TRABAJAR</SectionLabel><h2>Conocer. Conectar.<br/><em>Avanzar.</em></h2><p>Entendemos la representación como una relación a largo plazo. Escuchamos al mercado, conocemos las soluciones de nuestros fabricantes y trabajamos para que cada conexión aporte valor.</p><div className="mini-points"><span><CheckCircle2/> Cercanía profesional</span><span><CheckCircle2/> Especialización sectorial</span><span><CheckCircle2/> Compromiso comercial</span></div></div></div></section>
    <Callout/>
  </>
}

function Brands() {
  const [filter,setFilter] = useState('Todos')
  const [search,setSearch] = useState('')
  const filters = ['Todos','Construcción','Industria y ferretería','Seguridad laboral']
  const shown = brands.filter(b=>(filter==='Todos'||b.sectors.includes(filter))&&b.name.toLowerCase().includes(search.toLowerCase()))
  return <><PageHero kicker="NUESTRAS FIRMAS" title={<>Fabricantes de confianza.<br/><em>Soluciones profesionales.</em></>} sub="Una selección de marcas vinculadas a los sectores en los que desarrollamos nuestra actividad." image="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1800&q=85"/>
    <section className="section-pad"><div className="container"><div className="brand-tools"><div><SectionLabel>DIRECTORIO DE FIRMAS</SectionLabel><h2>Una red de <em>especialistas.</em></h2></div><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar marca..." aria-label="Buscar marca"/></div><div className="filter-row">{filters.map(f=><button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f}</button>)}</div><div className="directory-grid">{shown.map((b,i)=><div className="directory-card" key={b.name}><span>{String(i+1).padStart(2,'0')}</span><strong>{b.name}</strong><small>{b.sectors.join(' · ')}</small></div>)}</div><p className="demo-note">Directorio de referencia basado en la información disponible en la web actual. Las relaciones y categorías deben validarse antes de publicar.</p></div></section><Callout/></>
}

function SectorPage({index}:{index:number}) {
  const sector=sectors[index]
  const related=brands.filter(b=>b.sectors.includes(index===0?'Construcción':index===1?'Industria y ferretería':'Seguridad laboral'))
  return <><PageHero kicker={`SECTORES · 0${index+1}`} title={<>{sector.title}<br/><em>para profesionales.</em></>} sub={sector.text} image={sector.image}/>
    <section className="section-pad"><div className="container sector-detail"><div><SectionLabel>ESPECIALIZACIÓN</SectionLabel><h2>Soluciones para<br/><em>el trabajo real.</em></h2></div><div><p className="lead">{sector.text}</p><p>Representamos fabricantes y acercamos sus soluciones a distribuidores y profesionales. Nuestro conocimiento del sector nos permite ofrecer una interlocución cercana y orientada a las necesidades del mercado.</p></div></div></section>
    <section className="related-brands"><div className="container"><SectionLabel>FIRMAS RELACIONADAS</SectionLabel><h2>Marcas del <em>sector.</em></h2><div className="related-grid">{related.map(b=><div key={b.name}>{b.name}<ArrowUpRight size={15}/></div>)}</div><p className="demo-note">Listado de referencia pendiente de validación comercial.</p></div></section><Callout/></>
}

function Contact() {
  const [submitted,setSubmitted]=useState(false)
  const [attempted,setAttempted]=useState(false)
  const [values,setValues]=useState({name:'',company:'',email:'',phone:'',subject:'',message:'',privacy:false})
  const update=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>setValues({...values,[e.target.name]:e.target.type==='checkbox'?(e.target as HTMLInputElement).checked:e.target.value})
  const valid=values.name.trim()&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)&&values.message.trim()&&values.privacy
  const submit=(e:React.FormEvent)=>{e.preventDefault();setAttempted(true);if(valid)setSubmitted(true)}
  return <><PageHero kicker="CONTACTO" title={<>Hablemos de<br/><em>tu próximo proyecto.</em></>} sub="Estamos a tu disposición para atender consultas de fabricantes, distribuidores y profesionales." image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85"/>
    <section className="section-pad"><div className="container contact-grid"><div className="contact-info"><SectionLabel>ESTAMOS CERCA</SectionLabel><h2>Conectemos<br/><em>ideas y negocio.</em></h2><p className="body-copy">Puedes contactar con nuestro equipo a través de los siguientes canales.</p><div className="contact-item"><span>VISÍTANOS</span><p>{contact.address}</p></div><div className="contact-item"><span>LLÁMANOS</span>{contact.phones.map(p=><a key={p} href={`tel:${p.replace('/ /g','')}`}>{p}</a>)}</div><div className="contact-item"><span>ESCRÍBENOS</span>{contact.emails.map(e=><a key={e} href={`mailto:${e}`}>{e}</a>)}</div><div className="contact-item"><span>HORARIO</span><p>{contact.hours}</p></div><a className="map-link" href="https://www.google.com/maps/search/?api=1&query=Calle+Alejandro+Dumas+19+Malaga" target="_blank" rel="noreferrer">Ver ubicación en Google Maps <ArrowUpRight size={15}/></a></div>
    <div className="form-panel"><div className="form-heading"><span>FORMULARIO DE CONTACTO</span><p>Cuéntanos qué necesitas y nos pondremos en contacto contigo.</p></div>{submitted?<div className="form-success"><CheckCircle2 size={38}/><h3>¡Gracias por tu interés!</h3><p>Esta es una demostración: el formulario no envía información. En la web definitiva se conectará a un servicio de envío seguro.</p><button onClick={()=>{setSubmitted(false);setAttempted(false)}}>Enviar otra consulta</button></div>:<form onSubmit={submit} noValidate><div className="form-row"><label>Nombre *<input name="name" value={values.name} onChange={update} placeholder="Tu nombre"/></label><label>Empresa<input name="company" value={values.company} onChange={update} placeholder="Nombre de empresa"/></label></div><div className="form-row"><label>Email *<input name="email" type="email" value={values.email} onChange={update} placeholder="nombre@empresa.com"/></label><label>Teléfono<input name="phone" value={values.phone} onChange={update} placeholder="+34 600 000 000"/></label></div><label>Asunto<select name="subject" value={values.subject} onChange={update}><option value="">Selecciona una opción</option><option>Información comercial</option><option>Fabricantes</option><option>Distribución</option><option>Otra consulta</option></select></label><label>Mensaje *<textarea name="message" value={values.message} onChange={update} placeholder="Escribe aquí tu consulta..." rows={5}/></label><label className="privacy"><input type="checkbox" name="privacy" checked={values.privacy} onChange={update}/> He leído y acepto la política de privacidad.</label>{attempted&&!valid&&<p className="form-error">Revisa los campos obligatorios, el email y el consentimiento.</p>}<button className="button form-submit" type="submit">Enviar consulta <ArrowUpRight size={17}/></button><p className="form-disclaimer">Formulario demostrativo: no se transmiten ni almacenan los datos introducidos.</p></form>}</div></div></section><Callout/></>
}

function NotFound(){return <div className="not-found"><div className="container"><span>404</span><h1>Página no encontrada</h1><ButtonLink to="/">Volver al inicio</ButtonLink></div></div>}

export default function App() {
  const location=useLocation()
  return <><Header/><AnimatePresence mode="wait"><motion.main key={location.pathname} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.2}}><Routes location={location}><Route path="/" element={<Home/>}/><Route path="/sobre-nosotros" element={<About/>}/><Route path="/firmas-representadas" element={<Brands/>}/><Route path="/sectores/construccion" element={<SectorPage index={0}/>}/><Route path="/sectores/industria-ferreteria" element={<SectorPage index={1}/>}/><Route path="/sectores/seguridad-laboral" element={<SectorPage index={2}/>}/><Route path="/contacto" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Routes></motion.main></AnimatePresence><Footer/></>
}