'use client';

import { useEffect, useState } from 'react';
import { fetchRecipes } from '@/lib/api';
import { useRouter } from 'next/navigation'

export default function Home() {
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    fetchRecipes().then(data => {
      setRecipes(data.meals || []);
    });
  }, []);
  const router = useRouter();
  
  const handleClick = (id: string) => {
    router.push(`/recipes/${id}`);
  };

  return (
    <main>
      <h1>Recipe Book</h1>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.idMeal}>
              <span
                key={recipe.idMeal}
                className="cursor-pointer border p-4 rounded hover:shadow"
                onClick={() => handleClick(recipe.idMeal)}
              >
              {recipe.strMeal}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}