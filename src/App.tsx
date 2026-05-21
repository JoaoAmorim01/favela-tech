/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Extrato from './components/Extrato';
import Ajuda from './components/Ajuda';
import Parcelas from './components/Parcelas';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface-bright flex justify-center w-full relative">
        {/* Mobile View Container */}
        <div className="w-full max-w-md bg-surface shadow-2xl overflow-hidden relative min-h-screen">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/parcelas" element={<Parcelas />} />
            <Route path="/extrato" element={<Extrato />} />
            <Route path="/ajuda" element={<Ajuda />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
