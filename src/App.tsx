import { useEffect, useMemo, useState, createContext, useContext, type JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import EditorPage from "./pages/EditorPage";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

/** ---------- Auth context (minimal) ---------- */
type AuthContextType = { user: User | null; loading: boolean };
const AuthContext = createContext<AuthContextType>({ user: null, loading: true });
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);
  const value = useMemo(() => ({ user, loading }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** ---------- Route guard ---------- */
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-6 text-center text-stone-700">Loading…</div>;
  if (!user) return <Navigate to="/" replace />;
  return children;
}

/** ---------- App shell + routes ---------- */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing acts as Auth + Upload */}
          <Route path="/" element={<Landing />} />
          <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <EditorPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
