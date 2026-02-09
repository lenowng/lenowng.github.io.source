import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import ReadsPage from './pages/ReadsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="reads" element={<ReadsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
