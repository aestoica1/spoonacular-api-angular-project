import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-fav-recipes',
  templateUrl: './fav-recipes.component.html',
  styleUrls: ['./fav-recipes.component.css'],
})
export class FavRecipesComponent implements OnInit {
  recipes = [];
  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    // this.recipes = this.recipesService.favoriteRecipes;
  }
}
