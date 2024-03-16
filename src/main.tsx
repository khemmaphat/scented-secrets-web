import { createRoot } from 'react-dom/client';
import './styles/tailwind.css';
import App from './App.tsx';

const container = document.getElementById('root');

// Use non-null assertion operator (!) to tell TypeScript that `container` is not null or undefined
const root = createRoot(container!);
root.render(<App />);