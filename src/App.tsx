import './App.css';
import React from 'react';
import MainPage from './Pages/MainPage';
import LoginPage from './Pages/LoginPage/Views';
function App() {
  return (
    <div className="App">
      <MainPage/>
      <LoginPage/>
    </div>
  );
}

export default App;