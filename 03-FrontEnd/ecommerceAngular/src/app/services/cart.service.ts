import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  //Subject is a subclass of Observable, publishes events in the code
  //BehaviorSubject publishes the most recent event before a new subscriber shows
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  //Session Storage is what allows the items on the page to persist, even wtih refresh
  //storage: Storage = sessionStorage; 

  //Local Storage allows the items to persist even in browser restart
  storage: Storage = localStorage;

  constructor() { 

    //reads data from storage
    let data = JSON.parse(this.storage.getItem('cartItems'));

    if(data != null) {
      this.cartItems = data;
    }

    //computes totals based on the read storage data
    this.computeCartTotals();
  }

  addToCart(theCartItem: CartItem) {
    //Here, we check if we already have the item in our cart
    let alreadyInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    //We'll find the item in the cart based on id
    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!;
      
      //Then, we check if we found it
      alreadyInCart = (existingCartItem != undefined);
    }
    if (alreadyInCart) {
      existingCartItem.quantity++; //increment quantity
    }
    else {
      this.cartItems.push(theCartItem); //merely add the item to the array
    }
  
    //Computing cart total price and quantity
    this.computeCartTotals();
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--; //decrements the quantity in the shopping cart 

    if(theCartItem.quantity === 0) {
      this.remove(theCartItem);
    }
    else {
      this.computeCartTotals();
    }

  }

  remove(theCartItem: CartItem) {
    //get the index of item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);

    //if found, then remove item from the array at given index
    if(itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

  computeCartTotals() {
    let totalPriceValue: number = 0; //total price of items
    let totalQuantityValue: number = 0; //how many items are added to the cart
  
    for(let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
  
    //publish the new values, all subs will get the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //logging cart data for purpose of debugging
    this.logCartData(totalPriceValue, totalQuantityValue);

    //persist cart data
    this.persistCartItems();
  }

  //Method to allow items to persist 
  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }


  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart: ');
    for(let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, 
      unitPrice: ${tempCartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantityValue: ${totalQuantityValue}`);
    console.log('----');
  }
}
