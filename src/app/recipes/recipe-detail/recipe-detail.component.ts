import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  selectedId: any;
  selectedRecipe!: any;
  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.selectedId = this.route.snapshot.params['id'];
    this.recipesService.fetchIndividualRecipe(this.selectedId).subscribe(
      (selectedRecipeDetails) => {
        this.selectedRecipe = selectedRecipeDetails;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // onDeleteRecipe(selectedId: any) {
  //   this.recipesService.deleteRecipe(selectedId).subscribe(
  //     (success) => {},
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  //   this.router.navigate(['/recipes']);
  // }
}
