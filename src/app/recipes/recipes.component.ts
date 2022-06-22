import { Recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  loadedRecipes: Recipe[] = [];
  favouriteRecipes!: Recipe[];
  newRecipeForm!: FormGroup;
  error = null;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.newRecipeForm = new FormGroup({
      newRecipeData: new FormGroup({
        title: new FormControl(null, [Validators.required]),
        image: new FormControl(null, [Validators.required]),
        calories: new FormControl(null, [Validators.required]),
        cookingTime: new FormControl(null, [Validators.required]),
      }),
      ingredients: new FormArray([]),
    });

    this.recipesService.fetchRecipes().subscribe(
      (recipes) => {
        this.loadedRecipes = recipes;
      },
      (error) => {
        this.error = error.message;
      }
    );
    this.favouriteRecipes = this.recipesService.favoriteRecipes;

    // this.recipesService.fetchDbRecipes().subscribe(
    //   (dbRecipes) => {
    //     this.loadedRecipes = dbRecipes;
    //   },
    //   (error) => {
    //     this.error = error.message;
    //   }
    // );
  }

  getControls() {
    return (<FormArray>this.newRecipeForm.get('ingredients')).controls;
  }

  randomId(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  onSubmitNewRecipe() {
    let newRecipe: Recipe = {
      id: this.randomId(1000000, 9000000),
      title: this.newRecipeForm.value.newRecipeData.title,
      calories: this.newRecipeForm.value.newRecipeData.calories,
      caloriesUnit: 'cal',
      cookingTime: this.newRecipeForm.value.newRecipeData.cookingTime,
      image: this.newRecipeForm.value.newRecipeData.image,
      ingredients: this.newRecipeForm.value.ingredients,
    };
    this.loadedRecipes.push(newRecipe);
    this.newRecipeForm.reset();
  }

  onAddIngredients() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.newRecipeForm.get('ingredients')).push(control);
  }

  onAddToFav(clickedRecipe: any) {
    this.recipesService.addToFavourites(clickedRecipe);
  }

  onDeleteFavRecipe(recipeId: any) {
    this.recipesService.deleteFavRecipe(recipeId);
  }

  // onRecipeDetails(clickedRecipeId: any) {
  //   this.recipesService.fetchDbIndividualRecipe(clickedRecipeId).subscribe(
  //     (dbIndividualRecipe) => {},
  //     (error) => {
  //       this.error = error.message;
  //     }
  //   );
  // }
}
