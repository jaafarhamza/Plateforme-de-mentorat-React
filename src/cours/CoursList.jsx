import axios from 'axios';
import { useEffect, useState } from 'react';

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:8000/api/courses',
    //   headers: {
    //     Authorization: '14|BLmXjP4emqxq4rdRj4NolGxD0A5WAlAuN6fRRP8j4eee6b45',
    //   },
    })
      .then((response) => {
        console.log(response.data);
        const data = response.data.data;
        setCourses(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Liste des Cours</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {course.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              Durée : {course.duration} min
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Niveau : {course.difficulty_level}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Statut : {course.status}
            </p>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Catégorie :{' '}
                <span className="font-normal">{course.category?.name}</span>
              </p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Mentor :{' '}
                <span className="font-normal">{course.mentor?.name}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CourseList;
