import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { tokening, artist } from "./actions";
import './App.css';
import AppRouter from './AppRouter'
function App() {

  const dispatch = useDispatch()
  dispatch(tokening(""))
  dispatch(artist({ artists: [], searchKey: "" }))
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
