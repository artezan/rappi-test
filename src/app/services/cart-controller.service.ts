import { ProductModel } from 'src/app/models/product.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DATA_PRODUCTS } from '../_data/products';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class CartControllerService {
  public car$ = new BehaviorSubject<ProductModel[]>([]);
  private arrCar: ProductModel[] = [];
  constructor(public snackBar: MatSnackBar) {
    const car = JSON.parse(localStorage.getItem('car'));
    if (car) {
      this.arrCar = car;
      this.car$.next(car);
      this.openSnackBar(`Aun tenemos tu pedido listo para comprar 🛒`);
      this.arrCar.forEach(v => {
        DATA_PRODUCTS.products.find(p => p.id === v.id).quantity -= 1;
      });
    }
  }
  private openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }
  private dataGeneralRemove(produc: ProductModel) {
    DATA_PRODUCTS.products.find(p => p.id === produc.id).quantity -= 1;
  }
  private dataGeneraladd(id, num: number) {
    DATA_PRODUCTS.products.find(p => p.id === id).quantity += num;
  }
  public addCar(produc: ProductModel) {
    this.arrCar.push(produc);
    this.car$.next(this.arrCar);
    localStorage.setItem('car', JSON.stringify(this.arrCar));
    this.dataGeneralRemove(produc);
  }
  public removeCar(produc: ProductModel, num: number) {
    const index = this.arrCar.findIndex(a => a.id === produc.id);
    this.arrCar.splice(index, 1);
    this.car$.next(this.arrCar);
    localStorage.setItem('car', JSON.stringify(this.arrCar));
    this.dataGeneraladd(produc.id, 1);
  }
  public clearCart(id, num: number) {
    this.arrCar = this.arrCar.filter(a => a.id !== id);
    this.car$.next(this.arrCar);
    localStorage.setItem('car', JSON.stringify(this.arrCar));
    this.dataGeneraladd(id, num);
  }
  public clearCartAll() {
    this.arrCar = [];
    this.car$.next(this.arrCar);
    localStorage.setItem('car', JSON.stringify(this.arrCar));
  }
}
