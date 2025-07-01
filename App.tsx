import { Routes, Route } from "react-router-dom";
import Home from './src/pages/Home';
import Favorites from './src/pages/Favorites';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/favoritos" element={ <Favorites /> } />
    </Routes>
  );
}
