import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadView from './UploadView';
import EditView from './EditView';
import ResultsView from './ResultsView';
import './App.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadView />} />
        <Route path="/edit" element={<EditView />} />
        <Route path="/results" element={<ResultsView />} />
      </Routes>
    </Router>
  );
}
