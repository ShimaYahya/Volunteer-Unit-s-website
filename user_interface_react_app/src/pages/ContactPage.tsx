import { PageHero } from '../components/Layout'
import type { ReactNode } from 'react'

export function ContactPage() {
  return <><PageHero title="تــواصــل مــعــنــا" subtitle="نــرحــب بــاســتــفــســاراتــكــم واقــتــراحــاتــكــم" eyebrow="نــحــن هــنــا لــخــدمــتــكــم ودعــمــكــم الــتــطــوعــي" />
    <div className="container-fluid py-5"><div className="container py-5"><div className="row align-items-center">
      <div className="col-lg-7 py-2"><div className="bg-vlightred p-4 rounded"><h4 className="mb-4">من نحن</h4><p>تأسست وحدة التطوع في يوليو 2022 وتسعی لترسیخ ثقافة العمل التطوعي وتقدیم الفرص التطوعیة المختلفة لتحقیق أهداف وقف أویس القرني والمساهمة ﻓﻲ تحقیق أهدفه بالنهوض الحضاري للیمن، وتطویر قدرات ومواهب الشباب وصقلها واکسابهم مهارات العمل المجتمعي. وتلعب الوحدة دورًا مهمًا في بناء روح المبادرة والمسؤولية المجتمعية بين أفراد المجتمع المتطوعين.<br />يقوم عمل وحدة التطوع على المهام الثلاثة:<br />1- التنفيذ.<br />2- التعريف.<br />3- المناصرة.<br />وحدة التطوع في وقف أويس القرني ترتبط بشكل وثيق برؤية الوقف التي تركز على النهوض الحضاري من خلال التنمية المجتمعية المستدامة، وبناء قدرات الأفراد، وتعزيز العمل التنموي.</p></div></div>
      <div className="col-lg-5 mb-5 mb-lg-0 py-2"><div className="bg-vlightred d-flex flex-column justify-content-center px-5 contact-card">
        <ContactRow color="bg-primary" icon="fas fa-share-alt" title="تابعنا"><p className="m-0"><i className="fab fa-instagram ml-2" /><a href="https://www.instagram.com/veysvakfi" target="_blank" rel="noreferrer">instagram.com/veysvakfi</a></p><p className="m-0"><i className="fab fa-facebook-f ml-2" /><a href="https://www.facebook.com/veysvakfi" target="_blank" rel="noreferrer">facebook.com/veysvakfi</a></p><p className="m-0"><i className="fab fa-twitter ml-2" /><a href="https://twitter.com/veysvakfitr" target="_blank" rel="noreferrer">twitter.com/veysvakfitr</a></p></ContactRow>
        <ContactRow color="bg-secondary" icon="fa fa-phone-alt" title="اتصل بنا"><p className="m-0">99 61 745 536 90+</p></ContactRow>
        <ContactRow color="bg-warning" icon="fa fa-envelope" title="تواصل معنا"><p className="m-0">volunteering@veysvakfi.org</p></ContactRow>
      </div></div>
    </div></div></div>
  </>
}

function ContactRow({color,icon,title,children}:{color:string;icon:string;title:string;children:ReactNode}) {
  return <div className="d-flex align-items-center mb-5"><div className={`btn-icon ${color} ml-4`}><i className={`${icon} fa-2x text-white`} /></div><div className="mt-n1 small"><h4>{title}</h4>{children}</div></div>
}
