
import type { Page } from '../App'

interface HeaderProps {
  activePage: Page
}

const pageInfo: Record<Page, { title: string; subtitle: string }> = {
  Dashboard: {
    title: 'Dashboard',
    subtitle: 'Overview of your animal shelter',
  },
  Animals: {
    title: 'Animals',
    subtitle: 'Manage animals in your shelter',
  },
  Adoptions: {
    title: 'Adoptions',
    subtitle: 'Manage animal adoption records',
  },
  AdditionalFeatures: {
    title: 'Additional Features',
    subtitle: 'Explore additional features and their results',
  },
}

function Header({ activePage }: HeaderProps) {
  const { title, subtitle } = pageInfo[activePage]

  return (
    <header className="header">
      <div className="header-text">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-right">
        <div className="header-status">
          <span className="status-dot"></span>
          System online
        </div>

        <div className="user-avatar">A</div>
      </div>
    </header>
  )
}

export default Header
