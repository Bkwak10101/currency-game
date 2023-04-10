import {Component, HostBinding, OnInit} from '@angular/core';
import {CurrencyClientService, Rates} from "../../services/currency-client.service";
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})


export class GameComponent implements OnInit {
  @HostBinding('style.--text-color') textColor = '#2E3840';
  @HostBinding('style.--background-color') backgroundColor = '#F9DBBB';
  @HostBinding('style.--primary-accent-color') primaryAccentColor = '#4E6E81';
  @HostBinding('style.--secondary-accent-color') secondaryAccentColor = '#FF0303';
  rates: Rates = {} as Rates;
  result: String = '';

  defaultCurrency: string = '';
  requestCurrency: string = '';
  base: string = 'PLN'
  showHint: boolean = false;
  constructor(private currencyClient: CurrencyClientService) {
  }

  ngOnInit() {
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
