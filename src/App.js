import './App.css';
import Home from './components/Home'

function App() {
  console.log(process.env.REACT_APP_SPOTIFY_KEY, 'My Key')
  
  return (
    <div className="container">
      <Home />
    </div>
  );
}

export default App;
