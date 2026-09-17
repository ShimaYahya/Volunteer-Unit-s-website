import { useEffect, useMemo, useRef, useState } from 'react'
import { apiGet } from '../api'
import type { Person } from '../types'
import { PageHero } from '../components/Layout'

export function HomePage() {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [group, setGroup] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const groups = Math.max(1, Math.ceil(people.length / 5))

  useEffect(() => {
    document.title = 'وحدة التطوع'
    const controller = new AbortController()
    apiGet<Person[]>('/yemenipepole', controller.signal).then(setPeople).catch(e => { if (e.name !== 'AbortError') setError(true) }).finally(() => setLoading(false))
    return () => controller.abort()
  }, [])
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const first = el.querySelector<HTMLElement>('.item')
    const gap = Number.parseFloat(getComputedStyle(el).gap || '20')
    const move = ((first?.offsetWidth || 0) + gap) * 5
    const max = Math.min(0, (el.parentElement?.clientWidth || 0) - el.scrollWidth)
    el.style.transform = `translateX(${Math.max(-group * move, max)}px)`
  }, [group, people])
  const dots = useMemo(() => Array.from({ length: groups }), [groups])

  return <>
    <PageHero title="وحــــدة الــــتـــــطــــوع" subtitle="#تــــطــــوعــــك_وقــــف" eyebrow="وقــــف أويــــس الــــقــــرنــــي....وقــــفــــنــــا مــــعًــــا لــــنــــهــــضــــة الــــيــــمــــن" />
    <div className="container-fluid py-3"><div className="container py-3"><div className="row align-items-stretch gy-4">
      <div className="col-lg-5 d-flex yemen_center order-2 order-lg-1"><div className="yem-title-wrap my-auto text-end"><h2 className="yem-title py-3"><span className="yem-accent">يـــــمــــانــــيــــون</span><span className="yem-block">حــــــــــــــــــــــــــــــول</span><span className="yem-block">الــــــعــــــالــــــــم</span></h2></div></div>
      <div className="col-lg-7 d-flex yemen_center_video order-1 order-lg-2"><div className="my-auto w-100 video_card"><div className="ratio ratio-16x9 rounded-4 overflow-hidden video_v"><iframe src="https://www.youtube.com/embed/So7VZytby6c?rel=0&modestbranding=1" title="يمانيون حول العالم" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div></div></div>
    </div></div></div>
    <div className="container-fluid py-4"><div className="container py-4"><div className="row equal-heights">
      <div className="col-lg-7 py-3 order-2 order-lg-1"><div className="section-title position-relative mb-4"><h1 className="display-4">وحدة التطوع</h1></div><p>تسعى لترسيخ ثقافة العمل التطوعي وتقديم الفرص التطوعية المختلفة لتحقيق أهداف وقف أُويس القرني والمساهمة في تحقيق أهدافه بالنهوض الحضاري لليمن، وتطوير قدرات ومواهب الشباب وصقلها واكتسابهم مهارات العمل المجتمعي.</p>
        <div className="row pt-3 mx-0">{[['30', 'برنامج', 'تدريبي'], ['1040', 'متدرب', 'ومتدربة'], ['18', 'ساعة', 'تدريبية'], ['2683', 'متطوع', 'ومتطوعة']].map((stat, i) => <div className="col-3 px-0" key={stat[0]}><div className={`${i % 2 ? 'bg-vdarkred' : 'bg-vdark'} text-center p-4 h-100`}><h1 className="text-white">{stat[0]}</h1><h6 className="text-uppercase text-white">{stat[1]}<span className="d-block">{stat[2]}</span></h6></div></div>)}</div>
      </div>
      <div className="col-lg-5 logo-col photo_pa order-1 order-lg-2"><img src="/img_v/وحدة التطوع2.png" alt="وحدة التطوع" className="logo-img" /></div>
    </div></div></div>
    <section className="partners py-4" aria-label="شركاء وقف أويس القرني"><h2><span className="hl">مــن الــيــمــن </span>إلــى الــعــالــم</h2><div className="carousel">
      {/* {groups > 1 && <>
        <button className="nav prev"
          onClick={() => setGroup(g => Math.max(0, g - 1))}
          disabled={group === 0}
          aria-label="السابق">
          ‹
        </button>
        <button className="nav next" 
          onClick={() => setGroup(g => Math.min(groups - 1, g + 1))} 
          disabled={group === groups - 1} 
          aria-label="التالي">
            ›
        </button></>} */}
      <div className="track" ref={trackRef}>{loading ? <div className="item"><p>... جارٍ تحميل الشخصيات</p></div> : error ? <div className="item"><p>تعذّر جلب البيانات.</p></div> : people.length ? people.map(person => <div className="item" key={person.id}><img src={person.photo} alt={person.yemeni_name} loading="lazy" /><h3>{person.yemeni_name}</h3><p>{person.description}</p></div>) : <div className="item"><p>لا توجد شخصيات حالياً</p></div>}</div>
    </div>
    {/* {groups > 1 && <div className="dots">{dots.map((_, i) => <button key={i} className={`dot${i === group ? ' active' : ''}`} onClick={() => setGroup(i)} aria-label={`المجموعة ${i + 1}`} />)}</div>} */}
    </section>
  </>
}
