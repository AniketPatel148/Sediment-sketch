export default function Header() {
  return (
    <header className="sticky top-0 z-20">
      {/* same warm bar as before */}
      <div className="header-bar">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <h1 className="font-display text-5xl tracking-wide text-white drop-shadow">
            <span className="font-semibold">Sediment</span>{" "}
            <span className="font-light">Sketch</span>
          </h1>
        </div>
      </div>
    </header>
  );
}

