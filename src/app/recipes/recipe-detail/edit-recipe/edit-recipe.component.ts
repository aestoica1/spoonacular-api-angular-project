import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  selectedId: any;
  selectedRecipe!: Recipe;
  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService // private router: Router
  ) {}

  ngOnInit() {
    this.selectedId = this.route.snapshot.params['id'];
    this.recipesService.fetchIndividualRecipe(this.selectedId).subscribe(
      (selectedRecipeDetails: any) => {
        this.selectedRecipe = {
          id: selectedRecipeDetails.id,
          calories: selectedRecipeDetails.nutrition.nutrients[0].amount,
          caloriesUnit: selectedRecipeDetails.nutrition.nutrients[0].unit,
          cookingTime: selectedRecipeDetails.readyInMinutes,
          image: selectedRecipeDetails.image,
          title: selectedRecipeDetails.title,
          ingredients: selectedRecipeDetails.nutrition.ingredients,
        };
      },
      (error) => {
        console.log(error);
      }
    );
    // this.recipesService.fetchDbIndividualRecipe(this.selectedId).subscribe(
    //   (selectedRecipeDetails) => {
    //     this.selectedRecipe = selectedRecipeDetails;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  // onSaveEdit(form: any, recipeId: any) {
  //   this.recipesService.editRecipe(form.value, recipeId).subscribe(
  //     (success) => {},
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  //   this.router.navigate(['/recipes']);
  // }
}
