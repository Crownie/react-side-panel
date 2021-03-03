import React from 'react';
import './App.css';
import {SidePanelProvider} from './lib';
import Demo from './demo/components/Demo';

function App() {
  return (
    <div className="App">
      <SidePanelProvider>
        <Demo/>
      </SidePanelProvider>
    </div>
  );
}

export default App;
