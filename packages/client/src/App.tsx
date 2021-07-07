import { useEffect, useState } from 'react';

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        'https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=traptrix&sort=type',
      );
      const { data } = await res.json();
      setCards(data);
    })();
  }, []);

  return (
    <main>
      <div className="p-4 grid grid-cols-3 gap-4">
        {cards.length > 0 &&
          cards.map((card: any) => (
            <div className="flex flex-col text-center">
              <h2 className="pb-2">{card.name}</h2>
              <img src={card.card_images[0].image_url} alt={card.id} />
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
