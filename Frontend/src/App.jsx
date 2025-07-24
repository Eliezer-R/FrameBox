import Home from './home'
import PageCollection from './pageCollection'
import PageShowsImg from './pageShowsImg'
import SeeToImgContent from './components/pageToSeeTheImage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CollectionDetail from './CollectionDetail'
function App () {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collections' element={<PageCollection />} />
        <Route path='/collections/:id' element={<CollectionDetail />} />
        <Route path='/search' element={<PageShowsImg />} />
        <Route path='/search/:id' element={<SeeToImgContent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
