import axios from 'axios';
import { useEffect, useState } from 'react';

function CategoryList() {
  let [categories, setCategory] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:8000/api/categories',
    })
      .then((response) => {
        console.log('DATA:', response.data);
        const data = response.data.data;
        setCategory(data);
      })
      .catch((error) => {
        console.error('error', error);
      });
  }, []);
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl 
                   transition-all duration-300 ease-in-out transform hover:-translate-y-1 
                   overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div
                  className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 
                          flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
              </div>
              <h3
                className="text-lg font-semibold text-gray-800 dark:text-gray-100 
                       text-center mb-2 group-hover:text-indigo-600 
                       dark:group-hover:text-indigo-400 transition-colors duration-200">
                {category.name}
              </h3>
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
export default CategoryList;
