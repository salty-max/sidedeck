import { useEffect, useState } from 'react';

function App() {
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        'https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=Sky Striker',
      );
      const { data } = await res.json();
      setCards(data);
    })();
  }, []);

  return (
    <main>
      <div className="p-4 flex items-center flex-wrap gap-4">
        {(cards && cards.length) > 0 ? (
          cards.map((card) => {
            console.log(card);
            return (
              <div className="w-1/4 flex flex-col text-center">
                <h2 className="pb-2">{card.name}</h2>
                <h3 className="pb-2">{card.type}</h3>
                <h3 className="pb-2">{card.race}</h3>
                <img src={card.card_images[0].image_url} alt={card.id} />
              </div>
            );
          })
        ) : (
          <p>No results</p>
        )}
      </div>
    </main>
  );
}

export default App;
