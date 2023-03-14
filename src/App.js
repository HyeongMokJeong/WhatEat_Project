import './App.css';
import React, { Suspense } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ScrollToTop from './component/Scroll';

import Header from './component/Header';
import Body from './component/Body';
const Menu = React.lazy(() => import('./component/menu/Menu'));
const Page = React.lazy(() => import('./component/menu/Page'));
const OR = React.lazy(() => import('./component/menu/Osusume_result'));
const Q = React.lazy(() => import('./component/menu/Q'));

function App() {
    return (
      <div className='App'>
      <link href='https://fonts.googleapis.com/css2?family=Jua&display=swap' rel="stylesheet" type="text/css"></link>
        <BrowserRouter>
          <Header />
          <ScrollToTop />
          <Suspense fallback={<div>로딩중...</div>}>
          <Routes>
            <Route path="/" element={<Body />}></Route>
              <Route path="rice"  element={<Menu />}></Route>
              <Route path='rice/*' element={<Page />}></Route>
              <Route path="/china" element={<Menu />}></Route>
              <Route path="/china/*" element={<Page />}></Route>
              <Route path="/japan" element={<Menu />}></Route>
              <Route path="/japan/*" element={<Page />}></Route>
              <Route path="/bunsik" element={<Menu />}></Route>
              <Route path="/bunsik/*" element={<Page />}></Route>
              <Route path="/meat" element={<Menu />}></Route>
              <Route path="/meat/*" element={<Page />}></Route>
              <Route path="/pizza" element={<Menu />}></Route>
              <Route path="/pizza/*" element={<Page />}></Route>
              <Route path="/chicken" element={<Menu />}></Route>
              <Route path="/chicken/*" element={<Page />}></Route>
              <Route path="/burger" element={<Menu />}></Route>
              <Route path="/burger/*" element={<Page />}></Route>
              <Route path="/cafe" element={<Menu />}></Route>
              <Route path="/cafe/*" element={<Page />}></Route>
              <Route path="/sul" element={<Menu />}></Route>
              <Route path="/sul/*" element={<Page />}></Route>
              <Route path="/solo" element={<Menu />}></Route>
              <Route path="/solo/*" element={<Page />}></Route>
              <Route path='/osusume' element={<OR />}></Route>
              <Route path="/q" element={<Q />}></Route>
          </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
  );
}

export default App;