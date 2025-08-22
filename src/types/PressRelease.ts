export interface PressRelease {
  id: string
  title: string
  date: string
  published: boolean
  featured?: boolean
  content: string
  summary?: string
}