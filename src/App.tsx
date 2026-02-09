import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import ReadsPage from './pages/ReadsPage'
import ArchitecturePost from './pages/posts/ArchitecturePost'
import HydrogenMigrationPost from './pages/posts/HydrogenMigrationPost'
import AutomationPost from './pages/posts/AutomationPost'
import HerbologyPost from './pages/posts/HerbologyPost'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="reads" element={<ReadsPage />} />
          <Route path="architecture" element={<ArchitecturePost />} />
          <Route path="hydrogen" element={<HydrogenMigrationPost />} />
          <Route path="automation" element={<AutomationPost />} />
          <Route path="herbology" element={<HerbologyPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
