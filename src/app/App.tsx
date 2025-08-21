import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from '../pages/home/HomePage'
import RootLayout from './layouts/RootLayout/RootLayout'
import PlacesListPage from '../pages/places/PlacesListPage'
import PlaceDetailsPage from '../pages/places/PlaceDetailsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path='places' />
          <Route index element={<PlacesListPage />} />
          <Route path=':slug' element={<PlaceDetailsPage />} />
        </Route>
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}
