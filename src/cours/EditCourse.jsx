/** @format */

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = 'Bearer 16|CNlHKFRIP7fR6aQrRBc826JkyKHe79HgIBFvdgvMc959e2f9';

  const [form, setForm] = useState({
    name: '',
    description: '',
    content: '',
    status: 'open',
    duration: '',
    difficulty_level: '',
    price: '',
    category_id: '',
    mentor_id: '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories').then((res) => {
      setCategories(res.data.data);
    });

    axios.get(`http://localhost:8000/api/courses/${id}`).then((res) => {
      setForm(res.data.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/courses/${id}`, form, {
        headers: { Authorization: token },
      })
      .then(() => {
        alert('Cours mis à jour avec succès');
        navigate('/');
      })
      .catch((err) => {
        console.error('Erreur lors de la mise à jour :', err.response?.data);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Modifier le cours</h2>
      <input
        type="text"
        name="name"
        placeholder="Nom du cours"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="content"
        placeholder="Contenu"
        value={form.content}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        name="duration"
        placeholder="Durée en minutes"
        value={form.duration}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <select
        name="difficulty_level"
        value={form.difficulty_level}
        onChange={handleChange}
        className="w-full p-2 border rounded">
        <option value="">Niveau</option>
        <option value="beginner">Débutant</option>
        <option value="intermediate">Intermédiaire</option>
        <option value="advanced">Avancé</option>
      </select>

      <input
        type="number"
        name="price"
        placeholder="Prix"
        value={form.price}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <select
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
        className="w-full p-2 border rounded">
        <option value="">Choisir une catégorie</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded">
        Mettre à jour le cours
      </button>
    </form>
  );
}

export default EditCourse;
