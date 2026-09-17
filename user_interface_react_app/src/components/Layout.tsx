import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const socials = [
  ['facebook-f', 'https://www.facebook.com/veysvakfi', 'فيسبوك'],
  ['twitter', 'https://twitter.com/veysvakfitr', 'تويتر'],
  ['linkedin-in', 'https://www.linkedin.com/in/وقف-أويس-القرني-veysel-karani-vakfi-ba9322243', 'لينكدإن'],
  ['instagram', 'https://www.instagram.com/veysvakfi', 'إنستغرام'],
  ['youtube', 'https://www.youtube.com/@veysvakfi', 'يوتيوب'],
] as const

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll(); window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="site-shell">
    <header className={`site-navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container-fluid bg-vdark">
        <div className="row py-2 px-lg-5">
          <div className="col-lg-6 text-center text-lg-right mb-2 mb-lg-0 top-contact"><div className="d-inline-flex align-items-center text-white">
            <small>99 61 745 536 90+ <i className="fa fa-phone-alt mr-2" /></small><small className="px-3">|</small><small>volunteering@veysvakfi.org <i className="fa fa-envelope mr-2" /></small>
          </div></div>
          <div className="col-lg-6 text-center text-lg-left"><div className="d-inline-flex align-items-center">
            {socials.map(([icon, href, label]) => <a key={icon} className="text-white px-2" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><i className={`fab fa-${icon}`} /></a>)}
          </div></div>
        </div>
      </div>
      <div className="container-fluid p-0"><nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
        <NavLink to="/" className="navbar-brand ml-lg-3" onClick={() => setMenuOpen(false)}><img src="/img_v/icon.png" style={{height:'clamp(28px, 5vw, 52px)', width:'auto'}} alt="شعار وحدة التطوع" /><img src="/img_v/words.png" style={{height:'clamp(28px, 5vw, 52px)', width:'auto'}} alt="وحدة التطوع" /></NavLink>
        <button type="button" className="navbar-toggler" aria-label="فتح القائمة" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}><span className="navbar-toggler-icon" /></button>
        <div className={`navbar-collapse justify-content-between px-lg-3 text-center text-lg-right mobile-nav${menuOpen ? ' open' : ''}`}>
          <div className="navbar-nav mx-auto py-0">
            <NavLink to="/" end className="nav-item nav-link" onClick={() => setMenuOpen(false)}>الرئيسية</NavLink>
            <NavLink to="/news" className="nav-item nav-link" onClick={() => setMenuOpen(false)}>الأخبار</NavLink>
            <NavLink to="/projects" className="nav-item nav-link" onClick={() => setMenuOpen(false)}>فرص التطوع</NavLink>
            <NavLink to="/contact" className="nav-item nav-link" onClick={() => setMenuOpen(false)}>من نحن</NavLink>
          </div>
        </div>
      </nav></div>
    </header>
    <main className="site-main"><Outlet /></main>
    <footer className="container-fluid position-relative overlay-top bg-vdark text-white-50 py-5" style={{marginTop:90}}><div className="container mt-5 pt-5"><div className="row">
      <div className="col-md-8 mb-5"><NavLink to="/" className="navbar-brand"><h1 className="mt-n2 text-uppercase text-white">وحدة التطوع</h1></NavLink><p className="m-0">تسعی لترسیخ ثقافة العمل التطوعي وتقدیم الفرص التطوعیة المختلفة لتحقیق أهداف وقف أویس القرني والمساهمة ﻓﻲ تحقیق أهدفه بالنهوض الحضاري للیمن، وتطویر قدرات ومواهب الشباب وصقلها واکسابهم مهارات العمل المجتمعي.</p></div>
      <div className="col-md-4 mb-5"><h3 className="text-white mb-4">للتواصل معنا</h3><p><i className="fa fa-phone-alt mr-2" /> 99 61 745 536 90+</p><p><i className="fa fa-envelope mr-2" /> volunteering@veysvakfi.org</p><div className="d-flex justify-content-start mt-4">{socials.map(([icon, href, label]) => <a key={icon} className="text-white mr-4" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><i className={`fab fa-2x fa-${icon}`} /></a>)}</div></div>
    </div></div></footer>
    <button type="button" className="btn btn-lg btn-vred rounded-0 btn-lg-square back-to-top" aria-label="العودة إلى الأعلى" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}><i className="fa fa-angle-double-up" /></button>
  </div>
}

export function PageHero({title, subtitle, eyebrow}:{title:string; subtitle:string; eyebrow:string}) {
  return <div className="jumbotron jumbotron-fluid page-header position-relative overlay-bottom page-hero"><div className="container text-center my-5 py-5"><h1 className="text-white mt-4 mb-4">{title}</h1><h1 className="text-white mt-4 mb-4">{subtitle}</h1><h5 className="text-white lead mt-3">{eyebrow}</h5></div></div>
}
