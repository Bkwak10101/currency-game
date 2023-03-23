import {Component, OnInit} from '@angular/core';
import {CurrencyClientService, Rates} from "../../services/currency-client.service";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})



export class GameComponent implements OnInit {

  messageForUser:string = ''
  rates: Rates = {} as Rates;
  result: String = '';

  defaultCurrency: string = '';
  requestCurrency: string = '';
  exchangeRate: number = parseFloat(this.defaultCurrency)

  constructor(private currencyClient: CurrencyClientService) {
  }

  ngOnInit() {
    this.currencyClient.getCurrency().subscribe((data) => {
      this.rates = data.rates;
    });
  }

  sayHello(value: string) {
    this.messageForUser = 'Hello ' + value;
  }

  // check(value: string, currency: string) {
  //   // if(currency == this.rates.GBP){
  //
  //   if (parseFloat(value) > parseFloat(currency)) {
  //   // if (parseFloat(value) > this.rates.PLN) {
  //     this.result = 'Prompt amount too big';
  //   }
  //   if (parseFloat(value) < parseFloat(currency)) {
  //   // if (parseFloat(value) < this.rates.PLN) {
  //     this.result = 'Prompt amount too low'
  //   }
  //   if(parseFloat(value) == parseFloat(currency)) {
  //   // if(parseFloat(value) == this.rates.PLN) {
  //     this.result = 'The amount is exact. Congratulations!'
  //   }
  //
  // }
  check(value: string) {
    // if(currency == this.rates.GBP){
    //
    // }
    // switch(currency){
    //   case this.rates.PLN:
    //
    // }

    if (parseFloat(value) > this.rates.PLN) {
      this.result = 'Prompt amount too big';
    }
    if (parseFloat(value) < this.rates.PLN) {
      this.result = 'Prompt amount too low'
    }
    if(parseFloat(value) == this.rates.PLN) {
      this.result = 'The amount is exact. Congratulations!'
    }

  }
  currencyList: any[] = ['PLN', 'USD', 'GBP', 'EUR'];

  onChange(event: any){
    if (!this.defaultCurrency) {
      this.defaultCurrency = event.value
      // this.currencyClient.getExchangeRate(this.defaultCurrency, 'PLN').subscribe(
      //   rate => this.exchangeRate = rate
      // );
      // console.log("EXCHANGE RATE: " + this.exchangeRate)

    } else {
      this.requestCurrency = event.value;
    }
  }

}
