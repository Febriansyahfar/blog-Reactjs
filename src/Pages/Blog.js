import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function getArticles() {
      const request = await fetch(
        "https://api.spaceflightnewsapi.net/v3/articles"
      );
      const response = await request.json();

      setArticles(response);
      // console.log(response);
      setLoading(false);
    }
    getArticles();
  }, []);

  return (
    <section className="section">
      <h1 className="seciton-title">Blog Page</h1>

      {loading && <i>Loading articles ...</i>}
      {!loading && (
        <div className="articles">
          {articles.map(function (article) {
            return (
              <articles key={article.id} className="article">
                <h2 className="articles-title">
                  <Link to={`/blog/${article.id}`}>{article.title}</Link>
                </h2>
                <time className="articles-time">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </time>
              </articles>
            );
          })}
        </div>
      )}
    </section>
  );
}
