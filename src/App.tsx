import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import ReadsPage from './pages/ReadsPage'
import ArchitecturePost from './pages/blog/ArchitectureDeepDive'
import HydrogenMigrationPost from './pages/blog/HydrogenMigration'
import AutomationPost from './pages/blog/Automation'
import HerbologyPost from './pages/blog/Herbology'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="reads" element={<ReadsPage />} />
          <Route path="blog/architecture-deep-dive" element={<ArchitecturePost />} />
          <Route path="blog/hydrogen-migration" element={<HydrogenMigrationPost />} />
          <Route path="blog/automation" element={<AutomationPost />} />
          <Route path="blog/herbology" element={<HerbologyPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
