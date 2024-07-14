import React from 'react'
//import Beranda from './Beranda/Beranda'
import Berandates from './Beranda/Berandates'
import Nav from './Component/Nav'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Footer from './Component/Footer';
import { GlobalProvider } from './Context/GlobalDeclaration';
import Page from './Beranda/Page';


function App() {
  return (
    <>
    <BrowserRouter>
      <GlobalProvider>
          <Nav/>
            <Routes>
            <Route path='/' element={<Berandates/>}/>
            <Route path='/page/:IdData' element={<Page/>}/>

            </Routes>
          <Footer/>
      </GlobalProvider>
    </BrowserRouter>
      
        
      
    </>
  );
}

export default App;