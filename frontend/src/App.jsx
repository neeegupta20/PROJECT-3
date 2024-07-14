import './App.css'
import {Route, Routes} from 'react-router-dom'
import IndexPage from './pages/IndexPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { Layout } from './Layout.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { UserContextProvider } from './UserContext.jsx'
import AccountPage from './pages/AccountPage.jsx'
import PlacesPage from './pages/PlacesPage.jsx'
import PlaceForm from './pages/PlaceForm.jsx'
import PlacePage from './pages/PlacePage.jsx'
import BookingsPage from './pages/BookingsPage.jsx'


function App() {

  return(
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/your-account' element={<AccountPage/>}/>
          <Route path='/your-account/accommodations' element={<PlacesPage/>}/>
          <Route path='/your-account/accommodations/add' element={<PlaceForm/>}/>
          <Route path='/your-account/accommodations/:id?' element={<PlaceForm/>}/>
          <Route path='/accommodation/:id?' element={<PlacePage/>}/>
          <Route path='/your-account/bookings' element={<BookingsPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
    
  )
}

export default App
