import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// // Import mock API cho môi trường phát triển
// import './services/mockApi';

createRoot(document.getElementById("root")!).render(<App />);
