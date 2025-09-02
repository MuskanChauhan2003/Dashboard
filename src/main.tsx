
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ContentProvider } from './contexts/ContentContext.tsx'
import { SearchProvider } from './contexts/SearchContext.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ContentProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </ContentProvider>
  </AuthProvider>
);