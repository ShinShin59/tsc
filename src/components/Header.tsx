export function Header() {
  return (
    <header className="pointer-events-none">
      <h1 className="pointer-events-auto">
        <img
          src={`${import.meta.env.BASE_URL}images/title.png`}
          alt="ELEMENTAIRE — Retrouvez l'élément mystère"
          className="w-full"
        />
      </h1>
    </header>
  );
}
