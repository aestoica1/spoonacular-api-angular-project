import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private _apiKey = 'e7221d9e49e04040afd50e7b626e2f88';
  private _allRecipesUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${this._apiKey}&number=2`;

  favoriteRecipes = JSON.parse(localStorage.getItem('favRecipes') || '[]');
  editedRecipe!: Recipe;

  constructor(private http: HttpClient) {}

  fetchRecipes() {
    return this.http.get<{ [key: string]: Recipe }>(this._allRecipesUrl).pipe(
      map((responseData: any) => {
        let receivedRecipes: Recipe[] = [];
        Object.keys(responseData).forEach((key) => {
          if (key === 'results') {
            receivedRecipes.push(...responseData[key]);
          }
          receivedRecipes.map((recipes) => {
            this.fetchIndividualRecipe(recipes.id).subscribe((recipe: any) => {
              if (recipe.id === recipes.id) {
                recipes.calories = recipe.nutrition.nutrients[0].amount;
                recipes.caloriesUnit = recipe.nutrition.nutrients[0].unit;
                recipes.cookingTime = recipe.readyInMinutes;
              }
            });
          });
        });
        return receivedRecipes;
      }),
      catchError((errorResponse) => {
        return throwError(errorResponse);
      })
    );
  }

  fetchIndividualRecipe(clickedRecipe: number) {
    return this.http
      .get(
        `https://api.spoonacular.com/recipes/${clickedRecipe}/information?apiKey=${this._apiKey}&includeNutrition=true`
      )
      .pipe(
        map((responseDataIndividualRecipe) => {
          return responseDataIndividualRecipe;
        }),
        catchError((errorResponse) => {
          return throwError(errorResponse);
        })
      );
  }

  addToFavourites(clickedRecipe: Recipe) {
    if (clickedRecipe) {
      const checkIndex = this.favoriteRecipes.findIndex(
        (el: Recipe) => el.id === clickedRecipe.id
      );

      if (checkIndex === -1) {
        this.favoriteRecipes.push({
          id: clickedRecipe.id,
          title: clickedRecipe.title,
        });
        localStorage.setItem(
          'favRecipes',
          JSON.stringify(this.favoriteRecipes)
        );
      }
    }
  }

  deleteFavRecipe(clickedRecipeId: any) {
    let index = this.favoriteRecipes.findIndex(
      (eachRecipe: any) => eachRecipe._id === clickedRecipeId
    );
    this.favoriteRecipes.splice(index, 1);
    localStorage.setItem('favRecipes', JSON.stringify(this.favoriteRecipes));
  }
}

// Old Code Using Local DB
// fetchDbRecipes() {
//   return this.http.get<Recipe[]>('http://localhost:3000/recipes').pipe(
//     map((responseData) => {
//       let receivedDbRecipes: Recipe[] = [];
//       responseData.map((eachDbRecipe) => {
//         receivedDbRecipes.push(eachDbRecipe);
//       });
//       return receivedDbRecipes;
//     })
//   );
// }

// fetchDbIndividualRecipe(recipeId: number) {
//   return this.http
//     .get<Recipe>(`http://localhost:3000/recipes/${recipeId}`)
//     .pipe(
//       map((responseDataIndividualRecipe) => {
//         return responseDataIndividualRecipe;
//       }),
//       catchError((errorResponse) => {
//         return throwError(errorResponse);
//       })
//     );
// }

// createNewRecipe(newRecipe: Recipe) {
//   return this.http.post('http://localhost:3000/recipes', newRecipe);
// }

// editRecipe(form: any, recipeId: any) {
//   return this.http.put(`http://localhost:3000/recipes/${recipeId}`, form);
// }

// deleteRecipe(recipeId: any) {
//   return this.http.delete(`http://localhost:3000/recipes/${recipeId}`);
// }
