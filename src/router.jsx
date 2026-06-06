import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import GalleryPage from './components/sections/pages/GalleryPage.jsx'
import CourtXCaseStudy from './components/sections/pages/CourtXCaseStudy.jsx'

export default function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                  element={<App />} />
        <Route path="/gallery"           element={<GalleryPage />} />
        <Route path="/projects/courtx"   element={<CourtXCaseStudy />} />
      </Routes>
    </BrowserRouter>
  )
}
