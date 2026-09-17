import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../api'
import type { City, Country, ExecutionType, Project } from '../types'

type Filters = { execution: string; country: string; city: string }
const emptyFilters: Filters = { execution: 'all', country: 'all', city: 'all' }
const pageLoadedAt = Date.now()

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [types, setTypes] = useState<ExecutionType[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [draft, setDraft] = useState<Filters>(emptyFilters)
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    document.title = 'فرص التطوع | وحدة التطوع'
    const controller = new AbortController()
    Promise.all([apiGet<Project[]>('/projects',controller.signal),apiGet<ExecutionType[]>('/execution_type',controller.signal),apiGet<City[]>('/cities',controller.signal),apiGet<Country[]>('/countries',controller.signal)])
      .then(([p,t,c,co]) => { setProjects(p || []); setTypes(t || []); setCities(c || []); setCountries(co || []) })
      .catch(e => { if (e.name !== 'AbortError') setError(true) }).finally(() => setLoading(false))
    return () => controller.abort()
  }, [])
  const cityOptions = useMemo(() => draft.country === 'all' ? [] : cities.filter(c => String(c.CountryId) === draft.country), [cities,draft.country])
  const visible = useMemo(() => projects.filter(p => (filters.execution==='all'||String(p.execution_type_id)===filters.execution) && (filters.country==='all'||String(p.country_id)===filters.country) && (filters.city==='all'||String(p.city_id)===filters.city)).reverse(), [projects,filters])

  return <div className="container-fluid py-5"><div className="container py-5">
    <div className="row mx-0 justify-content-center"><div className="col-lg-8"><div className="section-title text-center position-relative mb-5"><h1 className="display-4">استكشف فرص تطوعية جديدة</h1></div></div></div>
    <div className="container mb-5"><div className="row"><div className="col-lg-12"><div className="card shadow-sm"><div className="card-body"><h5 className="card-title">تصفية المشاريع</h5>
      <form onSubmit={e => { e.preventDefault(); setFilters(draft) }}><div className="form-row">
        <FilterSelect label="نوع التنفيذ" value={draft.execution} onChange={execution => setDraft({...draft,execution})}><option value="all">كل أنواع التنفيذ</option>{types.map(t => <option key={t.id} value={t.id}>{t.execution_type}</option>)}</FilterSelect>
        <FilterSelect label="الدولة" value={draft.country} onChange={country => setDraft({...draft,country,city:'all'})}><option value="all">كل الدول</option>{countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</FilterSelect>
        <FilterSelect label="المدينة" value={draft.city} disabled={draft.country==='all'} onChange={city => setDraft({...draft,city})}><option value="all">{draft.country==='all'?'يرجى اختيار الدولة أولًا':'كل المدن'}</option>{cityOptions.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</FilterSelect>
      </div><div className="text-left"><button type="button" className="btn btn-outline-vred btn-outline-secondary ml-2" onClick={() => {setDraft(emptyFilters);setFilters(emptyFilters)}}>إعادة التصفية</button><button type="submit" className="btn btn-vdarkred">تطبيق</button></div></form>
    </div></div></div></div></div>
    <div className="row">{loading ? <Loading text="جارٍ تحميل المشاريع..." /> : error ? <ErrorState /> : visible.length ? visible.map(project => <ProjectCard key={project.id} project={project} />) : <div className="col-12 empty-state"><i className="fas fa-inbox fa-3x mb-3" /><h3>لا توجد مشاريع</h3><p>لا توجد مشاريع مطابقة لمعايير التصفية.</p></div>}</div>
  </div></div>
}

function FilterSelect({label,value,onChange,disabled,children}:{label:string;value:string;onChange:(value:string)=>void;disabled?:boolean;children:ReactNode}) {
  return <div className="col-md-3 mb-3"><label>{label}</label><select className="form-control" value={value} disabled={disabled} onChange={e => onChange(e.target.value)}>{children}</select></div>
}

function ProjectCard({project}:{project:Project}) {
  const start = formatDate(project.start_date), end = formatDate(project.end_date)
  const days = project.deadline ? Math.ceil((new Date(project.deadline).getTime()-pageLoadedAt)/86400000) : 0
  return <div className="col-lg-4 col-md-6 pb-4"><Link className="projects-list-item project-card-link position-relative d-block overflow-hidden mb-2" to={`/projects/${project.id}`}>
    <div className="category-badge">{project.Execution_type?.execution_type || 'غير محدد'}</div><img className="img-fluid" src={project.photo || '/img/bg-image.jpg'} alt={project.project_name} style={{width:800,height:400,objectFit:'cover'}} />
    <div className="projects-text"><h4 className="text-center text-white px-3">{project.project_name}</h4><div className="border-top w-100 mt-3"><div className="d-flex justify-content-between p-4"><span className="text-white"><i className="fa fa-map-marker-alt ml-2" />{project.City?.name || 'مدينة غير معروفة'}، {project.Country?.name || 'دولة غير معروفة'}</span><span className="text-white"><i className="fa fa-users ml-2" />{project.num_voliunteers || 0} متطوع/ـة</span></div><div className="project-details"><span className="text-white project-meta"><i className="fa fa-calendar ml-1" /> {start}–{end}</span><span className="text-white project-meta"><i className="fa fa-clock ml-1" /> {days>0?`${days} يوم متبقٍ`:'انتهى الموعد'}</span></div></div></div>
  </Link></div>
}

function formatDate(value:string) { return new Date(value).toLocaleDateString('ar',{month:'short',day:'numeric'}) }
export function Loading({text}:{text:string}) { return <div className="loading-state"><div className="spinner-border" role="status"><span className="sr-only">تحميل...</span></div><p className="mt-3">{text}</p></div> }
function ErrorState() { return <div className="col-12 error-state"><i className="fas fa-exclamation-triangle fa-3x mb-3" /><h3>خطأ في تحميل البيانات</h3><p>تعذّر الاتصال بالخادم. حاول مرة أخرى لاحقًا.</p></div> }
