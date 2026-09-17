import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { NewsPage } from './pages/NewsPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { ProjectsPage } from './pages/ProjectsPage'
import './App.css'

export default function App() {
  return <BrowserRouter><Routes><Route element={<Layout />}><Route index element={<HomePage />} /><Route path="projects" element={<ProjectsPage />} /><Route path="projects/:projectId" element={<ProjectDetailPage />} /><Route path="news" element={<NewsPage />} /><Route path="contact" element={<ContactPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes></BrowserRouter>
}
