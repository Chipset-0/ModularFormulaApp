import './App.css'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router'
import { Home } from './Pages/Home'
import { Search } from './Pages/Search'
import { Create } from './Pages/Create'
import { History } from './Pages/History'
import Navbar from './components/Navbar'
import { GroupProvider } from './context/GroupContext'
import { HistoryProvider } from './context/HistoryContext'

function NavbarPage () {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function App() {

  return (
    <div className='min-w-screen min-h-screen flex flex-col'>
      <GroupProvider>
        <HistoryProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<NavbarPage />}>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/create" element={<Create/>}></Route>
                <Route path="/search" element={<Search/>}></Route>
                <Route path='/history' element={<History/>} />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </HistoryProvider>
      </GroupProvider>
    </div>
  )
}

export default App
