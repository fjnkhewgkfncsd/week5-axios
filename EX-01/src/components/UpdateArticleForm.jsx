import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UpdateArticleForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });
  const { id } = useParams(); // Get article ID from URL parameters


  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    // Fetch article by ID to prefill the form
    try {
      const response = await axios.get(`http://localhost:3000/articles/${id}`);
      setForm(response.data);
      console.log('Fetched article:', response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    try{
      await axios.put(`http://localhost:3000/articles/${id}`,form)
      alert('Article updated successfully!');
    }catch(error){
      console.error('Error updating article:', error);
      alert('Failed to update article.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
      <button onClick={handleSubmit} type="submit">Update</button>
    </form>
  );
}
