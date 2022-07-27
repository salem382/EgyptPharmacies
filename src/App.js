import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Category from './components/category/Category';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Shoping from './components/shoping/Shoping';
import Register from './components/register/Register';
import Favorite from './components/favorite/Favorite';
import Search from './components/search/Search';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
        <Header />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/category' element={<Category />}/>
            <Route path='/shoping' element={<Shoping />}/>
            <Route path='/login' element={<Register/>}/>
            <Route path='/favorite' element={<Favorite/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='*' element={<div className='text-center my-5 text-danger fw-bold fs-3'> 404 This Page Not Found </div>}/>
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
