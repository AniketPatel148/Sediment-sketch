import { useState } from "react";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function AuthPage() {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const go = (path = "/start") => nav(path, { replace: true });

    const signInGoogle = async () => {
        try {
            setLoading(true);
            await signInWithPopup(auth, googleProvider);
            go();
        } catch (e: any) {
            setErr(e.message);
        } finally {
            setLoading(false);
        }
    };

    const signInEmail = async () => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, pw);
            go();
        } catch (e: any) {
            setErr(e.message);
        } finally {
            setLoading(false);
        }
    };

    const signUpEmail = async () => {
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, pw);
            go();
        } catch (e: any) {
            setErr(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-dvh flex flex-col">
            <Header />

            <main className="flex-1 flex items-center justify-center px-6">
                <div className="panel w-full max-w-md p-6 space-y-4">
                    <button onClick={signInGoogle} disabled={loading}
                        className="btn w-full bg-white text-stone-900 border border-white shadow-soft hover:bg-white/90">
                        Continue with Google
                    </button>

                    <div className="h-px bg-white/30 my-4" />

                    <div className="space-y-2">
                        <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        <input className="input" type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} />
                        <div className="flex gap-2">
                            <button onClick={signInEmail} disabled={loading} className="btn flex-1 bg-sand-500 text-white border border-sand-700">Sign in</button>
                            <button onClick={signUpEmail} disabled={loading} className="btn flex-1 bg-sand-500 text-white border border-sand-700">Sign up</button>
                        </div>
                    </div>

                    {err && <p className="text-red-600 text-sm">{err}</p>}
                </div>
            </main>
        </div>
    );
}
