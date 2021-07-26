import faker from "faker";
import { useState, useEffect } from "react";
import "./App.css";

const createRandomPost = async () => {
  await fetch("http://localhost:3001/newsletters", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: faker.lorem.words(3),
      authorName: faker.name.firstName(),
      authorId: faker.datatype.uuid(),
      date: faker.date.past().toLocaleDateString(),
    }),
  });
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [newsletters, setNewsletters] = useState([]);

  // esto es más avanzado
  const fetchNewsletters = async () => {
    setIsLoading(true);
    const res = await fetch("http://localhost:3001/newsletters");
    const data = await res.json();
    setNewsletters(data ?? []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  return (
    <div className="App">
      <header className="header">LetterMind Last Week Posts!</header>
      <div className="body">
        <div className="bar">
          <p>This are the latest posts!</p>
          <button className="button" onClick={fetchNewsletters}>
            Refresh
          </button>
          <button className="button" onClick={createRandomPost}>
            Add
          </button>
        </div>
        {isLoading && (
          <div>
            <p>
              <i>Loading ...</i>
            </p>
          </div>
        )}
        {!isLoading && (
          <div className="list">
            {newsletters.length <= 0 && (
              <p>
                <i>There are no posts</i>
              </p>
            )}
            {newsletters.map((nesletter) => {
              const subTitle = `${nesletter.authorName} · ${nesletter.date}`;
              return (
                <div className="newsteller-item">
                  <div className="label">{nesletter.name}</div>
                  <div className="sub">{subTitle}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
