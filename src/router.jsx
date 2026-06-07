import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import GalleryPage from './components/sections/pages/GalleryPage.jsx'
import CourtXCaseStudy from './components/sections/pages/CourtXCaseStudy.jsx'
import CTFarmaCaseStudy from './components/sections/pages/CTFarmaCaseStudy.jsx'
import PageProgressBar from './components/ui/PageProgressBar.jsx'

export default function RouterApp() {
  return (
    <BrowserRouter>
      <PageProgressBar />
      <Routes>
        <Route path="/"                  element={<App />} />
        <Route path="/gallery"           element={<GalleryPage />} />
        <Route path="/projects/courtx"   element={<CourtXCaseStudy />} />
        <Route path="/projects/ctfarma"  element={<CTFarmaCaseStudy />} />
      </Routes>
    </BrowserRouter>
  )
}