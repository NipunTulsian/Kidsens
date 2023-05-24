import './App.css';
import { useNavigate } from 'react-router';
function App() {
  const navigate=useNavigate()
  navigate("./login")
  return (
    <h1>welcome to app.js</h1>
  )
}

export default App;
