import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from "./components/header"
import Footer from "./components/footer"
import HomePage from "./pages/home"
import LoginPage from './pages/login'
import AdminPage from './pages/admin'
import RecipeDetailPage from "./pages/recipeDetail"
import RecipesPage from "./pages/recipes"
import ResetPasswordPage from './pages/resetPassword'
import ProtectedRoute from "./components/protecedRoute"

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/reset-password' element={<ResetPasswordPage/>}/>
        <Route path='/receitas' element={<RecipesPage/>}/>
        <Route path='/receitas/:id' element={<RecipeDetailPage/>}/>
        <Route
          path='/admin'
          element={
            <ProtectedRoute>
              <AdminPage/>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
