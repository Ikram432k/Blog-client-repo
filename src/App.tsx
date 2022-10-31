import React from 'react';
import { HashRouter as Router,Route,Routes } from 'react-router-dom';
import Nav from "./components/header/header";
import Home from './components/page/home/home';
import Post from './components/page/post/post';
import { createGlobalStyle } from 'styled-components';
import Login from './components/author/login/login';
import Signup from './components/author/signup/signup';
const GlobalStyle = createGlobalStyle`
 body,h1,h2,h3,p {
  margin: 0;
}
body{
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;
function App() {
  return (
    <Router>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route path='*' element={<Home/>} />
        <Route path='/post/:id' element={<Post/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
