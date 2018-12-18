import { ListSublevelComponent } from './components/category/list-sublevel/list-sublevel.component';
import { ListCarComponent } from './components/car/list-car/list-car.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'list-category', pathMatch: 'full' },
  { path: 'list-category', component: ListCategoryComponent },
  { path: 'list-product', component: ListProductsComponent },
  { path: 'list-car', component: ListCarComponent },
  { path: 'list-sublevel', component: ListSublevelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
