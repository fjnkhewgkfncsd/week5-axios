import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get('http://localhost:3000/articles');
      setAllArticles(res.data);
      setArticles(res.data); // Initialize articles with all fetched articles
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API
    try{
      const res = await axios.get('http://localhost:3000/journalists');
      setJournalists(res.data);
      console.log('Fetched journalists:', res.data);
    }catch (error) {
      console.error('Error fetching journalists:', error);
    }
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter">
          <option value="">All Journalists</option>
          {/* Options for journalists */}
          {journalists.map(j => (
            <option key={j.id} value={j.id}>
              {j.name ? j.name : `Journalist #${j.id}`}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            const selectedJournalist = document.getElementById('journalistFilter').value;
            if(selectedJournalist === "") {
              // If no journalist is selected, show all articles
              setArticles(allArticles);
            }
            else if(selectedJournalist) {
              const filteredArticles = allArticles.filter(article => article.journalistId === parseInt(selectedJournalist));
              setArticles(filteredArticles);
            }
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            fetchArticles();
            document.getElementById('journalistFilter').value = ""; // Reset the filter dropdown
          }}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}