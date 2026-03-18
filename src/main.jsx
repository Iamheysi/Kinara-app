import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Expose mountApp for supabase-auth.js to call after authentication
window.__mountApp = () => {
  const root = createRoot(document.getElementById('root'));
  root.render(<App />);
};

// If auth resolved before this module loaded (fast session restore),
// trigger mount immediately
if (window.__kinaraReady) window.__mountApp();
