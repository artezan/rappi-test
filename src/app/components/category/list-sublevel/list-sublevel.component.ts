import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SublevelModel, CategoryModel } from 'src/app/models/category.model';
import { DATA_CATEGORY } from 'src/app/_data/categories';

@Component({
  selector: 'app-list-sublevel',
  templateUrl: './list-sublevel.component.html',
  styleUrls: ['./list-sublevel.component.scss']
})
export class ListSublevelComponent implements OnInit {
  category: CategoryModel;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.getSublevelByIdFather(+params['id']);
      }
    });
  }

  ngOnInit() {}
  getSublevelByIdFather(idFather: number) {
    this.category = DATA_CATEGORY.categories.find(cat => cat.id === idFather);
  }
  goToProducts(id) {
    const data: NavigationExtras = {
      queryParams: { id, fatherId: this.category.id }
    };
    this.router.navigate(['list-product'], data);
  }
}
