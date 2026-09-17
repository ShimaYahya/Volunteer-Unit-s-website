import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiGet } from '../api'
import type { Project } from '../types'
import { Loading } from './ProjectsPage'

export function ProjectDetailPage() {
  const {projectId} = useParams()
  const [project,setProject] = useState<Project | null>(null)
  const [loading,setLoading] = useState(Boolean(projectId))
  const [error,setError] = useState(!projectId)
  useEffect(() => {
    document.title = 'تفاصيل المشروع | وحدة التطوع'
    if (!projectId) return
    const controller = new AbortController()
    apiGet<Project>(`/projects/${encodeURIComponent(projectId)}`,controller.signal).then(setProject).catch(e => {if(e.name!=='AbortError')setError(true)}).finally(()=>setLoading(false))
    return () => controller.abort()
  },[projectId])
  if (loading) return <div className="container py-5"><Loading text="جارٍ تحميل تفاصيل المشروع..." /></div>
  if (error || !project) return <div className="container error-state"><i className="fas fa-exclamation-triangle fa-3x mb-3" /><h3>المشروع غير موجود</h3><p>تعذّر العثور على المشروع الذي تبحث عنه.</p><Link to="/projects" className="btn btn-primary mt-3"><i className="fa fa-arrow-right ml-2" /> تصفّح المشاريع</Link></div>
  const targetUrl = project.project_link || project.link || project.url
  return <div className="container-fluid py-5"><div className="container py-5"><div className="row"><div className="col-lg-8">
    <div className="project-header"><div className="project-badge">{project.Execution_type?.execution_type || 'غير محدد'}</div><img className="project-image w-100 mb-4" src={project.photo || '/img/bg-image.jpg'} alt={project.project_name} /></div>
    <Link to="/projects" className="back-btn"><i className="fa fa-arrow-right ml-2" /> العودة إلى المشاريع</Link><div className="section-title position-relative mb-4"><h1>{project.project_name}</h1></div>
    <div className="project-description"><p>{project.description || 'لا يوجد وصف متاح.'}</p>{project.additional_info && <p>{project.additional_info}</p>}</div>
    <div className="conditions-box"><h5><i className="fa fa-exclamation-circle ml-2" /> الشروط:</h5><p>{project.conditions || 'لا توجد شروط خاصة.'}</p></div>
    <div className="contact-info"><h5><i className="fa fa-info-circle ml-2" /> معلومات التواصل:</h5><p><i className="fa fa-user ml-2" /> {project.contact_person || 'منسق المشروع'}<br/><i className="fa fa-envelope ml-2" /> {project.contact_email || 'غير متاح'}<br/><i className="fa fa-phone-alt ml-2" /> {project.contact_phone || 'غير متاح'}</p></div>
    <button className="volunteer-btn" disabled={!targetUrl} title={targetUrl?'الانتقال إلى موقع المشروع':'لا يتوفر رابط لهذا المشروع'} onClick={() => {if(targetUrl) window.location.assign(targetUrl)}}><i className="fa fa-handshake ml-2" /> التطوع في هذا المشروع</button>
  </div><div className="col-lg-4 mt-5 mt-lg-0"><div className="info-card mb-5"><h3><i className="fa fa-info-circle ml-2" />معلومات المشروع</h3><Info label="مدير المشروع" value={project.project_manager || 'غير محدد'} /><Info label="تاريخ البدء" value={formatDate(project.start_date)} /><Info label="تاريخ الانتهاء" value={formatDate(project.end_date)} /><Info label="الموقع" value={`${project.City?.name || 'غير محدد'}، ${project.Country?.name || ''}`} /><Info label="نوع التنفيذ" value={project.Execution_type?.execution_type || 'غير محدد'} /><Info label="المتطوعون المطلوبون" value={String(project.num_voliunteers || 'غير محدد')} /></div></div></div></div></div>
}
function Info({label,value}:{label:string;value:string}) { return <div className="info-item"><span className="info-label">{label}</span><span className="info-value">{value}</span></div> }
function formatDate(value:string) { return new Date(value).toLocaleDateString('ar',{year:'numeric',month:'long',day:'numeric'}) }
