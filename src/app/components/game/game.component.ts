import {Component, OnInit} from '@angular/core';
import {CurrencyClientService, Rates} from "../../services/currency-client.service";
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})


export class GameComponent implements OnInit {
  messageForUser: string = ''
  rates: Rates = {} as Rates;
  result: String = '';

  defaultCurrency: string = '';
  requestCurrency: string = '';
  base: string = 'PLN'

  constructor(private currencyClient: CurrencyClientService) {
  }

  ngOnInit() {
  }

  sayHello(value: string) {
    this.messageForUser = 'Hello ' + value;
  }


  check(value: string) {
    if (parseFloat(value) > this.rates.PLN) {
      this.result = 'Prompt amount too big';
    }
    if (parseFloat(value) < this.rates.PLN) {
      this.result = 'Prompt amount too low'
    }
    if (parseFloat(value) == this.rates.PLN) {
      this.result = 'The amount is exact. Congratulations!'
    }
  }

  currencyList: string[] = ['PLN', 'USD', 'GBP', 'EUR'];

  onChange(event: MatSelectChange) {
    if (this.defaultCurrency) {
      this.defaultCurrency = event.value;
    } else {
      this.requestCurrency = event.value;
    }
    this.base = event.value
    this.currencyClient.getCurrency(this.base).subscribe((data) => {
      this.rates = data.rates;
    });
  }

  onChangeRequestCurrency($event2: MatSelectChange) {
    if (this.requestCurrency) {
      this.requestCurrency = $event2.value;
    } else {
      this.requestCurrency = $event2.value;
    }
  }
}
