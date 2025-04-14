'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

type Recipe = {
  idMeal: string;
  strMeal: string;
  // image: string;
  strArea: string;
  strInstructions: string;
  // ingredients: string[];
  strCategory: string;
};

export default function RecipeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/recipes/${id}`);
        if (!res.ok) throw new Error('Failed to fetch recipe');
        const data = await res.json();
        setRecipe(data.meals[0]);

        // Fetch recipes of the same category
        const categoryRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/recipes?category=${encodeURIComponent(data.category)}`
        );
        if (!categoryRes.ok) throw new Error('Failed to fetch category recipes');
        const categoryData = await categoryRes.json();
        setCategoryRecipes(categoryData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;
  console.log(recipe, "recipe")
  return (
    <div className="flex flex-col md:flex-row p-4">
      {/* Main Content */}
      <div className="md:w-3/4 md:pr-4">
        <div className="flex flex-col md:flex-row">
          {/* Recipe Image */}
          {/* <img
            src={recipe.strMeal}
            alt={recipe.strMeal}
            className="w-full md:w-1/3 h-auto object-cover rounded mb-4 md:mb-0"
          /> */}
          {/* Recipe Title and Country */}
          <div className="md:ml-4 flex justify-center">
            <h1 className="text-3xl font-bold text-center md:text-left">{recipe.strMeal}</h1>
            <Link href={`/recipes?country=${encodeURIComponent(recipe.strArea)}`}>
              <span className="text-blue-500 text-center md:text-left mt-2">{recipe.strArea}</span>
            </Link>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
          <p className="text-justify">{recipe.strInstructions}</p>
        </div>

        {/* Ingredients */}
        
      </div>

      {/* Sidebar */}
      <aside className="md:w-1/4 mt-8 md:mt-0">
        <h2 className="text-xl font-semibold mb-4">More in {recipe.strCategory}</h2>
        {/* <ul className="space-y-2">
          {categoryRecipes
            .filter((r) => r.idMeal !== recipe.idMeal)
            .map((r) => (
              <li key={r.id}>
                <Link href={`/recipes/${r.id}`}>
                  <a className="text-blue-500">{r.strArea}</a>
                </Link>
              </li>
            ))}
        </ul> */}
      </aside>
    </div>
  );
}