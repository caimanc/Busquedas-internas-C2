import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BinarySearchPage from "@/Pages/Busqueda binaria/page.tsx";
import LinearSearchPage from "@/Pages/Busqueda Lineal/page.tsx";
import HashFoldingPage from "./Pages/Hash plegamiento/page";
import HashModuloPage from "./Pages/Hash Modulo/page";
import HashSquarePage from "./Pages/Hash Cuadrado/page";
import HashTruncationPage from "./Pages/Hash truncamiento/page";

function App() {
  return (
    <Router>
      <div className="flex flex-col flex-1">
        <header className="border-b bg-black sticky top-0 z-10">
          <div className="container flex h-16 items-center px-4">
            <h1 className="text-2xl font-bold text-white">Búsquedas Internas</h1>
          </div>
          <div className="border-t border-white"></div>
        </header>

        <nav className="container flex justify-around py-4">
          <Link to="/busqueda-lineal" className="text-gray-500 hover:text-gray-700">Búsqueda Lineal</Link>
          <Link to="/busqueda-binaria" className="text-gray-500 hover:text-gray-700">Búsqueda Binaria</Link>
          <Link to="/Modulo" className="text-gray-500 hover:text-gray-700">Modulo</Link>
          <Link to="/cuadrado" className="text-gray-500 hover:text-gray-700">Cuadrado</Link>
          <Link to="/plegamiento" className="text-gray-500 hover:text-gray-700">Plegamiento</Link>
          <Link to="/truncamiento" className="text-gray-500 hover:text-gray-700">Truncamiento</Link>
        </nav>
        <div className="border-t border-gray-300"></div>

        <main className="flex-1 container px-4 mt-4">
          <Routes>
            <Route path="/busqueda-binaria" element={<BinarySearchPage />} />
            <Route path="/busqueda-lineal" element={<LinearSearchPage />} />
            <Route path="/plegamiento" element={<HashFoldingPage />} />
            <Route path="/cuadrado" element={<HashSquarePage />} />
            <Route path="/Modulo" element={<HashModuloPage />} />
            <Route path="/truncamiento" element={<HashTruncationPage />} />
          </Routes>
        </main>
        
        <div className="border-t border-gray-300"></div>

        <footer className="border-t py-4 bg-background mt-4">
          <div className="container px-4 text-center text-sm text-muted-foreground">
            <p>Ciencias 2 Equipo 5</p>
            <p>Camilo Andrés Caimán - Sofia Florez - Laura  </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
