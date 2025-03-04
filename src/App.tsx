import {useState} from 'react';
import Articles from "./Articles.tsx";
import "./App.css";
function App({ articles }) {
   articles.sort((a,b)=> a.upvotes-b.upvotes).reverse();


  const [ArticleData, setArticleData] = useState(articles);

  
  const handleMostUpvoted = () => {
    
    articles.sort((a,b)=> a.upvotes-b.upvotes).reverse();
    setArticleData([...articles])
  };

  const handleMostRecent = () => {
    articles.sort((a,b)=> new Date(a.date)- new Date(b.date)).reverse()
   setArticleData([...articles])
  };
  console.log(ArticleData)
  return (
    <>
    
      <div className="App">
        <div className="layout-row align-items-center justify-content-center my-20 navigation">
          <label className="form-hint mb-0 text-uppercase font-weight-light">
            Sort By
          </label>
          <button
            data-testid="most-upvoted-link"
            className="small"
            onClick={handleMostUpvoted}
          >
            Most Upvoted
          </button>
          <button
            data-testid="most-recent-link"
            className="small"
            onClick={handleMostRecent}
          >
            Most Recent
          </button>
        </div>
        <Articles articles={ArticleData} />
      </div>
    </>
  );
}

export default App;
