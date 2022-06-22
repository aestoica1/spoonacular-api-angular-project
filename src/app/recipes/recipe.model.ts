import { Ingredient } from './ingredient.model';

export interface Recipe {
  id: number;
  calories: number;
  caloriesUnit: string;
  cookingTime: number;
  image: string;
  title: string;
  ingredients?: [Ingredient];
}
