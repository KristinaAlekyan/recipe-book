const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchRecipes(filter?: {
  ingredient?: string;
  country?: string;
  category?: string;
}) {
  let url = `${BASE_URL}/recipes`;

  if (filter) {
    const params = new URLSearchParams(filter as any).toString();
    url += `?${params}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
}

export async function fetchRecipeById(id: string) {
  const res = await fetch(`${BASE_URL}/recipes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch recipe info');
  return res.json();
}