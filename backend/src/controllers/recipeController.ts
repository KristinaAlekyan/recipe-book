import { Request, Response } from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.API_BASE_URL;

export const getRecipes = async (req: Request, res: Response) => {
  const { ingredient, category, country } = req.query;

  let url = `${BASE_URL}/search.php?s=`;

  if (ingredient) url = `${BASE_URL}/filter.php?i=${ingredient}`;
  if (category) url = `${BASE_URL}/filter.php?c=${category}`;
  if (country) url = `${BASE_URL}/filter.php?a=${country}`;

  try {
    const response = await fetch(url as string);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const url = `${BASE_URL}/lookup.php?i=${id}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipe info' });
  }
};