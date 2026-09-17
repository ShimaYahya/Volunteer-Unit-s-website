import { useEffect, useRef, useState } from 'react'
import { apiGet } from '../api'
import type { NewsItem } from '../types'
import { Loading } from './ProjectsPage'

const VISIBLE_COUNT = 6
const fallbackImage = 'https://picsum.photos/1200/800?blur=2'

export function NewsPage() {
  const [items,setItems] = useState<NewsItem[]>([])
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(false)
  const [showAll,setShowAll] = useState(false)
  const [selected,setSelected] = useState<NewsItem | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    document.title = 'الأخبار | وحدة التطوع'
    const controller = new AbortController()
    apiGet<NewsItem[]>('/news',controller.signal).then(data => setItems((data || []).slice().reverse())).catch(e => {if(e.name!=='AbortError')setError(true)}).finally(()=>setLoading(false))
    return () => controller.abort()
  },[])
  useEffect(() => {
    document.body.classList.toggle('no-scroll',Boolean(selected))
    if (selected) closeRef.current?.focus()
    const escape = (event:KeyboardEvent) => {if(event.key==='Escape')setSelected(null)}
    document.addEventListener('keydown',escape)
    return () => {document.body.classList.remove('no-scroll');document.removeEventListener('keydown',escape)}
  },[selected])

  return <><section className="news-section"><div className="container"><header className="news-head text-lg-right back_color_red"><h2>آخر <span>الأخبار</span></h2><br/><p>ابقَ على اطلاع بآخر مبادراتنا وفعالياتنا وفرص التطوع.</p></header>
    <div className="news-grid">{loading ? <Loading text="جارٍ تحميل الأخبار…" /> : error ? <div className="error-state">فشل تحميل الأخبار. تأكد من تشغيل الخادم ثم حاول مجددًا.</div> : items.length ? items.slice(0,showAll?items.length:VISIBLE_COUNT).map(item => <article className="news-card" key={item.id}><div className="thumb"><img src={item.photo || fallbackImage} alt={item.news_title || 'صورة الخبر'} /></div><div className="content"><span className="title">{item.news_title || 'بدون عنوان'}</span><p className="excerpt">{truncate(item.description || '',180)}</p><button className="more read-btn" type="button" onClick={() => setSelected(item)}>اقرأ المزيد</button></div></article>) : <div className="empty-state">لا توجد أخبار لعرضها حاليًا.</div>}</div>
    {!loading && !error && items.length>VISIBLE_COUNT && !showAll && <div className="show-more-wrap"><button className="show-more" type="button" onClick={() => setShowAll(true)}>عرض المزيد</button></div>}
  </div></section>
  {selected && <div className="news-modal" role="presentation" onMouseDown={e => {if(e.target===e.currentTarget)setSelected(null)}}><div className="news-dialog" role="dialog" aria-modal="true" aria-labelledby="dialogTitle"><div className="dialog-header"><button ref={closeRef} className="dialog-close" aria-label="إغلاق" onClick={() => setSelected(null)}>×</button></div><div className="dialog-media"><img src={selected.photo || fallbackImage} alt={selected.news_title} /></div><div className="dialog-body"><h2 id="dialogTitle">{selected.news_title}</h2><p>{selected.description}</p></div></div></div>}
  </>
}
function truncate(text:string,max:number) { return text.length>max?`${text.slice(0,max).trim()}…`:text }
