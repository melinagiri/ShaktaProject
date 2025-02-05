//// src/App.js
//import React from 'react';
//import './App.css';
//import ResidentsReport from './ResidentsReport'; // Importing ResidentsReport

//function App() {
//  return (
//    <div className="App">
//      <ResidentsReport /> {/* Only render it once */}
//    </div>
//  );
//}

//export default App;


import React from 'react';
import './App.css';
import Residents from './Residents';  // Import the Residents component

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Residents Management System</h1>
            </header>

            <main>
                {/* Residents component where CRUD operations and table display happen */}
                <Residents />
            </main>
        </div>
    );
}

export default App;
