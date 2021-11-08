import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import './App.css';
import "materialize-css/dist/css/materialize.min.css";

import UsernameInputScreen from './screens/usernameInputScreen';
import ChatScreen from './screens/chatScreen';

function App() {

  return (
     <Router>
       <Routes>
         <Route path='/'  element={<UsernameInputScreen/>}/>
         <Route path='/chat/:username' element={<ChatScreen/>} />
       </Routes>
     </Router>
  );
}

export default App;