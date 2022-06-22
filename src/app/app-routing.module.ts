import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavRecipesComponent } from './recipes/fav-recipes/fav-recipes.component';
import { RecipesComponent } from './recipes/recipes.component';
import { EditRecipeComponent } from './recipes/recipe-detail/edit-recipe/edit-recipe.component';

const routes: Routes = [
  { path: '', component: RecipesComponent },
  {
    path: 'recipes',
    component: RecipesComponent,
  },
  {
    path: 'fav-recipes',
    component: FavRecipesComponent,
  },
  {
    path: 'recipe-detail/:id',
    children: [
      {
        path: 'edit-recipe',
        component: EditRecipeComponent,
      },
      {
        path: '',
        component: RecipeDetailComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
