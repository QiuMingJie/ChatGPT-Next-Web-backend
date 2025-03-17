import defaultSettings from '@/settings'

const title = defaultSettings.title || 'njucm backend'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
