import { useEffect, useState } from 'react';
import axios from 'axios'
export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [journalists, setJournalists] = useState([]);
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get('http://localhost:3000/articles');
      setArticles(res.data);
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

  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      const res = await axios.get('http://localhost:3000/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
         <select id="journalistFilter">
          <option value="">All Journalists</option>
          {journalists.map(j => (
            <option key={j.id} value={j.id}>
              {j.name ? j.name : `Journalist #${j.id}`}
            </option>
          ))}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter">
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.name ? c.name : `Category #${c.id}`}
            </option>
          ))}
        </select>

        <button
          onClick={async () => {
            // Logic to apply filters
            const journalistId = document.getElementById('journalistFilter').value;
            const categoryId = document.getElementById('categoryFilter').value;
            if (!journalistId && !categoryId) {
              fetchArticles(); // Reset to all articles if no filter is selected
              return;
            }
            let URL = 'http://localhost:3000/article?';
            if (journalistId) {
              URL += `journalistId=${journalistId}&`;
            }
            if (categoryId) {
              URL += `categoryId=${categoryId}`;
            }
            const res = await axios.get(URL);
            if(!res.data || res.data.length === 0) {
              alert('No articles found for the selected filters.');
            }else{
              setArticles(res.data);
            }
            
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            try {
              document.getElementById('journalistFilter').value = '';
              document.getElementById('categoryFilter').value = '';
              fetchArticles(); // Fetch all articles again
            } catch (error) {
              console.error('Error resetting filters:', error);
            }
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