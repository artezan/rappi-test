import { Component, OnInit } from '@angular/core';
import { CartControllerService } from 'src/app/services/cart-controller.service';
import { ProductModel } from 'src/app/models/product.model';
import { PriceToNumber } from 'src/app/_data/_helpers';
import { DATA_PRODUCTS } from 'src/app/_data/products';
import { MatDialog, MatSnackBar } from '@angular/material';
import { GeneralAlertComponent } from '../../shared/general-alert/general-alert.component';

@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.scss']
})
export class ListCarComponent implements OnInit {
  carList: { name: string; num: number; sub: number; id: string }[] = [];
  constructor(
    private carService: CartControllerService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    carService.car$.subscribe(data => {
      this.getItems(data);
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000
    });
  }

  ngOnInit() {}
  getItems(products: ProductModel[]) {
    const arr: { name: string; num: number; sub: number; id: string }[] = [];
    products.forEach(p => {
      const index = arr.findIndex(a => a.id === p.id);
      if (index === -1) {
        arr.push({
          name: p.name,
          num: 1,
          sub: PriceToNumber(p.price),
          id: p.id
        });
      } else {
        arr[index].num = arr[index].num + 1;
        arr[index].sub = arr[index].sub + PriceToNumber(p.price);
      }
    });
    this.carList = arr;
  }
  addCar(p: { name: string; num: number; sub: number; id: string }, index) {
    const product = DATA_PRODUCTS.products.find(prod => prod.id === p.id);
    this.carService.addCar(product);
  }
  removeOne(p: { name: string; num: number; sub: number; id: string }, index) {
    if (index === 1) {
      this.messageError(p);
    } else {
      const product = DATA_PRODUCTS.products.find(prod => prod.id === p.id);
      this.carService.removeCar(product, p.num);
    }
  }
  getSum() {
    const arrNum = this.carList.map(c => c.sub);
    const getSum = (total, num) => {
      return total + num;
    };
    return arrNum.reduce(getSum);
  }
  getSum2() {
    const arrNum = this.carList.map(c => c.num);
    const getSum = (total, num) => {
      return total + num;
    };
    return arrNum.reduce(getSum);
  }
  messageError(p: {
    name: string;
    num: number;
    sub: number;
    id: string;
  }): void {
    const dialogRef = this.dialog.open(GeneralAlertComponent, {
      data: {
        header: 'Borrar',
        body: `<p> Desea borrar producto ${p.name} </p>`,
        isform: false,
        hideButtonCancel: false
      }
    });
    const sub = dialogRef.componentInstance.buttons.subscribe(res => {
      if (res === 'ok') {
        this.carService.clearCart(p.id, p.num);
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
  buy(): void {
    const dialogRef = this.dialog.open(GeneralAlertComponent, {
      data: {
        header: 'Revice su pedido',
        body: `<p> <b># Productos:</b> ${this.getSum2()} </p>
        <p> <b>Total:</b>$ ${this.getSum()} </p>
        `,
        isform: false,
        hideButtonCancel: false
      }
    });
    const sub = dialogRef.componentInstance.buttons.subscribe(res => {
      if (res === 'ok') {
        this.openSnackBar('🎉 Gracias por su compra 🎉');
        this.carService.clearCartAll();
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
  getRest(id): number {
    return DATA_PRODUCTS.products.find(p => p.id === id).quantity;
  }
}
