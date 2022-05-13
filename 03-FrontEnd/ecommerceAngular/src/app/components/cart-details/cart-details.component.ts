import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  //Main function where all other functions are called from
  listCartDetails() {
    //We get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
    //We subscribe to the cart totalPrice and totalQuantity
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);
    //We then compute the total price and quantity
    this.cartService.computeCartTotals();
  }

  //This adds an item to the shopping cart
  incrementQuantity(theCartitem: CartItem) {
    this.cartService.addToCart(theCartitem);
  }

  decrementQuantity(theCartitem: CartItem) {
    this.cartService.decrementQuantity(theCartitem);
  }
  
  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }

}
