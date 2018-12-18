import { DATA_PRODUCTS } from './../../../_data/products';
import { Component, OnInit } from '@angular/core';
import { CategoryModel, SublevelModel } from 'src/app/models/category.model';
import { DATA_CATEGORY } from 'src/app/_data/categories';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  public categoriesFather: CategoryModel[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this.categoriesFather = DATA_CATEGORY.categories;
    console.log(this.categoriesFather);
  }
  getProductsNum(sub: SublevelModel[]) {
    DATA_PRODUCTS.products.filter(p => p.sublevel_id);
  }
  goToSublevel(id) {
    const data: NavigationExtras = {
      queryParams: { id }
    };
    this.router.navigate(['list-sublevel'], data);
  }
}
