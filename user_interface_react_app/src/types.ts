export interface Country { id: number; name: string }
export interface City { id: number; name: string; CountryId?: number }
export interface ExecutionType { id: number; execution_type: string }
export interface Project {
  id: number; project_name: string; start_date: string; end_date: string
  country_id: number; city_id: number; execution_type_id: number
  description?: string; additional_info?: string; project_manager?: string
  contact_person?: string; contact_email?: string; contact_phone?: string
  project_link?: string; link?: string; url?: string; num_voliunteers?: number
  deadline?: string; conditions?: string; photo?: string; available?: boolean
  Country?: Country; City?: City; Execution_type?: ExecutionType
}
export interface NewsItem { id: number; news_title: string; news_date?: string; description?: string; photo?: string }
export interface Person { id: number; yemeni_name: string; description?: string; photo?: string }
export interface ApiEnvelope<T> { data?: T; rows?: T; success?: boolean; message?: string[] }
