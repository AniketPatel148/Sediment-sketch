import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

/** Simple header styled like your mock */
function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-white/20 bg-gradient-to-b from-sand-500 to-sand-600/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <h1 className="text-2xl tracking-widest font-semibold text-white/95">
          <span className="font-extralight">Sediment</span> Sketch
        </h1>
      </div>
    </header>
  );
}

export type LandingProps = {
  onPickFile: (file: File) => void;
};

export default function Landing() {
  const { user } = useAuth();
  const nav = useNavigate();

  // email auth state
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [authErr, setAuthErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // upload
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const doGoogle = async () => {
    setAuthErr(null);
    setBusy(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e: any) {
      setAuthErr(e.message ?? "Sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  const doEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthErr(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email.trim(), pass);
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), pass);
      }
    } catch (err: any) {
      setAuthErr(err.message ?? "Auth error");
    } finally {
      setBusy(false);
    }
  };

  const onPick = async (f: File) => {
    // show preview + pass dataURL to editor
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      nav("/editor", { state: { imageDataUrl: dataUrl } });
    };
    reader.readAsDataURL(f);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand-100 via-sand-100 to-sand-200 text-stone-900">
      <Header />

      <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-10">
        {/* If not authed -> Auth cards */}
        {!user ? (
          <div className="grid w-full gap-6 md:grid-cols-2">
            <section className="panel text-white">
              <h2 className="mb-4 text-lg font-semibold">Sign in</h2>
              <button
                className="btn btn-secondary w-full mb-4"
                onClick={doGoogle}
                disabled={busy}
              >
                Continue with Google
              </button>

              <div className="my-3 h-px w-full bg-white/20" />

              <form onSubmit={doEmail} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full"
                />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="input w-full"
                />
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">
                    {mode === "signin" ? "No account?" : "Have an account?"}{" "}
                    <button
                      type="button"
                      onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                      className="underline"
                    >
                      {mode === "signin" ? "Sign up" : "Sign in"}
                    </button>
                  </span>
                  <button className="btn btn-primary" disabled={busy} type="submit">
                    {mode === "signin" ? "Sign in" : "Create account"}
                  </button>
                </div>
                {authErr && <p className="text-red-200 text-sm">{authErr}</p>}
              </form>
            </section>

            <section className="panel text-white">
              <h2 className="mb-2 text-lg font-semibold">What is this?</h2>
              <p className="text-white/80">
                Upload a rock image, trace outlines with a brush, and download the
                coordinates (JSON/CSV/TXT). Signed-in users can keep their work in
                Firebase.
              </p>
            </section>
          </div>
        ) : (
          // If authed -> Upload card like the video’s landing
          <section className="panel text-white w-full max-w-2xl">
            <h2 className="mb-4 text-lg font-semibold">Upload an image to begin</h2>
            <div className="rounded-lg border border-white/30 bg-white/5 p-4">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onPick(f);
                }}
              />
              <div className="flex items-center justify-between gap-3">
                <button className="btn btn-sand-200" onClick={() => fileRef.current?.click()}>
                  Upload
                </button>
                <p className="text-white/70 text-sm">
                  Supported: JPG, PNG, WEBP. You’ll go to the editor after selecting.
                </p>
              </div>
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="mt-4 max-h-64 w-full rounded-md object-contain ring-1 ring-white/20"
                />
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
