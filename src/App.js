import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import AppRouter from './AppRouter'
function App() {


  return (
    <Router>
    <div className="App">
      <div className='header'>
        <span>Spotify Artist Search</span>
      </div>
      <div className='content'>
        <AppRouter />
      </div>
    </div>
    </Router>
  );
}

export default App;
