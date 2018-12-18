import { CategoryModel, SublevelModel } from 'src/app/models/category.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DATA_CATEGORY } from 'src/app/_data/categories';
import { DATA_PRODUCTS } from 'src/app/_data/products';
import { ProductModel } from 'src/app/models/product.model';
import { PriceToNumber } from 'src/app/_data/_helpers';
import { CartControllerService } from 'src/app/services/cart-controller.service';
import { MatDialog } from '@angular/material';
import { GeneralAlertComponent } from '../../shared/general-alert/general-alert.component';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  category: CategoryModel;
  sublevel: SublevelModel;
  sublevelsOfSublevel: SublevelModel[] = [];
  products: ProductModel[] = [];
  realProducts: ProductModel[] = [];
  isAvailable: string;
  max;
  min;
  minS;
  sliderMin;
  sliderMax;
  startMax;
  sortBy;
  searchByName: string;
  lastId: number;
  li: SublevelModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartControllerService,
    public dialog: MatDialog
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.getProducts(+params['id']);
        this.category = DATA_CATEGORY.categories.find(
          cat => cat.id === +params['fatherId']
        );
        this.sublevel = this.category.sublevels.find(
          sub => sub.id === +params['id']
        );

        // obtiene productos
        this.init(+params['id']);
        this.pushLi(this.sublevel);
      }
    });
  }

  private init(id) {
    this.lastId = +id;
    this.products = this.getProducts(id);
    this.realProducts = this.products;
    this.sliderMin = this.minFound();
    this.sliderMax = this.maxFound();
    this.max = this.maxFound();
  }

  ngOnInit() {}
  getProducts(id: number) {
    return DATA_PRODUCTS.products.filter(p => p.sublevel_id === id);
  }

  goToSublevel() {
    const data: NavigationExtras = {
      queryParams: { id: this.category.id }
    };
    this.router.navigate(['list-sublevel'], data);
  }
  filter() {
    this.products = this.realProducts;
    if (this.isAvailable !== undefined) {
      this.filterAvailable();
    }
    if (this.min) {
      this.products = this.products.filter(
        p => PriceToNumber(p.price) >= this.min
      );
    }
    if (this.max) {
      this.products = this.products.filter(
        p => PriceToNumber(p.price) <= this.max
      );
    }
    if (this.minS) {
      this.products = this.products.filter(p => p.quantity >= this.minS);
    }
    if (this.sortBy) {
      this.sortByNum(this.sortBy);
    }
    if (this.searchByName) {
      this.searchName();
    }
  }
  searchName() {
    this.products = this.products.filter(p => {
      const index = p.name.indexOf(this.searchByName);
      if (index === -1) {
        return false;
      } else {
        return true;
      }
    });
  }
  sortByNum(str: string) {
    if (str === '2') {
      const compare = (a: ProductModel, b: ProductModel) => {
        if (PriceToNumber(a.price) > PriceToNumber(b.price)) {
          return -1;
        }
        if (PriceToNumber(a.price) < PriceToNumber(b.price)) {
          return 1;
        }
        return 0;
      };
      this.products = this.products.sort(compare);
    }
    if (str === '1') {
      const compare = (a: ProductModel, b: ProductModel) => {
        if (PriceToNumber(a.price) < PriceToNumber(b.price)) {
          return -1;
        }
        if (PriceToNumber(a.price) > PriceToNumber(b.price)) {
          return 1;
        }
        return 0;
      };
      this.products = this.products.sort(compare);
    }

    if (str === '3') {
      const compare = (a: ProductModel, b: ProductModel) => {
        if (!a.available) {
          return -1;
        }
        if (a.available) {
          return 1;
        }
        return 0;
      };
      this.products = this.products.sort(compare);
    }

    if (str === '4') {
      const compare = (a: ProductModel, b: ProductModel) => {
        if (a.available) {
          return -1;
        }
        if (!a.available) {
          return 1;
        }
        return 0;
      };
      this.products = this.products.sort(compare);
    }

    if (str === '6') {
      const compare = (a: ProductModel, b: ProductModel) => {
        if (a.quantity > b.quantity) {
          return -1;
        }
        if (a.quantity < b.quantity) {
          return 1;
        }
        return 0;
      };
      this.products = this.products.sort(compare);
    }

    if (str === '5') {
      const compare = (a: ProductModel, b: ProductModel) => {
        if (a.quantity < b.quantity) {
          return -1;
        }
        if (a.quantity > b.quantity) {
          return 1;
        }
        return 0;
      };
      this.products = this.products.sort(compare);
    }
  }
  filterAvailable() {
    let filter;
    if (this.isAvailable === 'true') {
      filter = true;
    } else {
      filter = false;
    }

    this.products = this.products.filter(p => p.available === filter);
  }
  maxFound() {
    const array1 = this.products.map(p => PriceToNumber(p.price));
    return Math.max(...array1);
  }
  minFound() {
    const array1 = this.products.map(p => PriceToNumber(p.price));
    return Math.min(...array1);
  }
  minSFound() {
    const array1 = this.products.map(p => p.quantity);
    return Math.min(...array1);
  }
  pushLi(sublevel: SublevelModel) {
    this.li.push(sublevel);
    // obtiene sub nivel
    this.sublevelsOfSublevel = this.checkSublevel(sublevel);
    this.init(+sublevel.id);
  }
  returnLi(sublevel: SublevelModel, index: number) {
    this.li = this.li.splice(0, index + 1);
    this.sublevelsOfSublevel = this.checkSublevel(sublevel);
    this.init(+sublevel.id);
  }
  checkSublevel(sublevel: SublevelModel) {
    if (sublevel.sublevels) {
      return sublevel.sublevels;
    } else {
      return [];
    }
  }
  addCar(product: ProductModel) {
    this.cartService.addCar(product);
  }
  seeProduct(product: ProductModel) {
    const dialogRef = this.dialog.open(GeneralAlertComponent, {
      data: {
        header: `Producto: ${name}`,
        body: `<div style="text-align: center" ><img  src="assets/image1.png" ></div>
        <p> <b># Cantidad:</b> ${product.quantity} </p>
          <p> <b>Precio:</b> ${product.price} </p>
          <p> <b>Disponible:</b> ${product.available ? 'si' : 'no'} </p>
          <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
           Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and scrambled
             it to make a type specimen book. It has survived not only five centuries,</p>
          `,
        isform: false,
        hideButtonCancel: true
      }
    });
    const sub = dialogRef.componentInstance.buttons.subscribe(res => {
      if (res === 'ok') {
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
