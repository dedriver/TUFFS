import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ContextApiProvider from './assets/context/contextApi.jsx';

createRoot(document.getElementById('root')).render(
    <ContextApiProvider>
        <App />
    </ContextApiProvider>
);
