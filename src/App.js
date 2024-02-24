import React from 'react';
import TypingPopup from './Components/TypingPopup';
import TaskList from './Components/TaskList';
import './Styles/App.css';

function App() {
  return (
    <div className="App">
      <TypingPopup />
      <TaskList />
    </div>
  );
}

export default App;
