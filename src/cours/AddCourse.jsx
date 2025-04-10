/** @format */

import axios from 'axios';
import { useEffect, useState } from 'react';

function AddCourse() {
  let [categories, SetCategory] = useState([]);
  let [user, SetUser] = useState([null]);
  let [form, SetForm] = useState({
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
  let token = 'Bearer 16|CNlHKFRIP7fR6aQrRBc826JkyKHe79HgIBFvdgvMc959e2f9';

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories').then((res) => {
      SetCategory(res.data.data);
    });
    axios
      .get('http://localhost:8000/api/auth/user', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        SetUser(res.data.user);
      });
  }, []);

  let handleChange = (e) => {
    SetForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:8000/api/courses',
        {
          ...form,
          mentor_id: user?.id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        alert('cree cours is done');
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Erreur API:', error.response?.data || error.message);
      });
      
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Créer un nouveau cours</h2>

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
        className="bg-indigo-600 text-white px-4 py-2 rounded">
        Créer le cours
      </button>

      {user && (
        <p className="text-sm text-gray-600"><strong>Mentor : {user.name}</strong> </p>
      )}
    </form>
  );
}
export default AddCourse;
