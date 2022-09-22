import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import ProtectedRoutes from './components/ProtectedRoutes';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/menu' element={<Menu/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
