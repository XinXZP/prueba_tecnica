import Home from "./views/Home";
import InfoShow from "./views/InfoShow";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/show/:id" element={<InfoShow />} />
            </Routes>
        </Router>
    );
}

export default App
