import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { SearchPage } from './pages/SearchPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminPage } from './pages/admin/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes - no header/footer */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminPage />} />

        {/* Main site routes - with header/footer */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/categoria/:slug" element={<CategoryPage />} />
                  <Route path="/search" element={<SearchPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
