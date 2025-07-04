import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import SeriePage from './pages/SeriePage'
import SerieFormPage from './pages/serie/SerieFormPage'
import SerieEditFormPage from './pages/serie/SerieEditFormPage'
import CategoryFormPage from './pages/CategoryFormPage' 
import HeaderComponent from './components/HeaderComponent'
import { AppProvider } from './contexts/AppContext'

// Componente Layout que incluye el Header y renderiza las rutas hijas
function Layout() {
  return (
    <>
      <HeaderComponent />
      <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
    </>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Ruta de login sin header */}
          <Route path="/" element={<LoginPage />} />
          
          {/* Rutas con header */}
          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/series/new" element={<SerieFormPage/>} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/series" element={<SeriePage />} />
            <Route path="/series/new" element={<SerieFormPage />} />
            <Route path="/series/edit/:id" element={<SerieEditFormPage />} />
            <Route path="/categories/new" element={<CategoryFormPage />} />
            <Route path="/categories/edit/:id" element={<CategoryFormPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App