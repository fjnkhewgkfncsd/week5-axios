import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get('http://localhost:3000/articles');
      setArticles(res.data);
      setAllArticles(res.data); // Initialize allArticles with all fetched articles
    } catch (error) {
      console.error('Error fetching articles:', error);
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
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter">
          <option value="">All Categories</option>
          {/* Options for categories */}
          {
            categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name ? c.name : `Category #${c.id}`}
              </option>
            ))
          }
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            const selectedCategory = document.getElementById('categoryFilter').value;
            if (selectedCategory === "") {
              // If no category is selected, show all articles
              fetchArticles();
            } else {
              const filteredArticles = allArticles.filter(article => article.categoryId === parseInt(selectedCategory));
              setArticles(filteredArticles);
            }
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            fetchArticles(); // Reset to all articles
            document.getElementById('categoryFilter').value = ""; // Reset the select input
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