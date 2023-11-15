import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'


function App() {
  return (
    <div className="App">     
      <div className="container text-center">
      <br/>
        <div className="row">
          <h1>NASA</h1>
        </div>
        <br/>
        <br/>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
