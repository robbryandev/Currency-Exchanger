export enum Currency {
  USD,
  CAD,
  MXN,
  AUD,
  EUR,
  GBP
}

export default class Money {
  val: number;
  from: Currency;
  to: Currency;
  static curList: string[] = Money.getCurrencies();
  constructor(val: number, from: Currency, to: Currency) {
    this.val = val;
    this.from = from;
    this.to = to;
  }

  async getValue(): Promise<string | boolean> {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${Money.curList[this.from]}`;
    return new Promise((resolve) => {
      fetch(url)
        .then((res) => {
          if (res.ok) {
            res.json()
              .then((jres) => {
                const data = jres.conversion_rates[Money.curList[this.to]];
                resolve(this.formatValue(data));
              });
          } else {
            resolve(false);
          }
        });
    });
  }

  formatValue(newVal: string) {
    const num = parseFloat(newVal) * this.val;
    return num.toFixed(2);
  }

  static getCurrencies(): string[] {
    const res: string[] = [];
    for (let c = 0; c < 6; c++) {
      res.push(Currency[c]);
    }
    return res;
  }

  static toCurrency(val: string) {
    switch(val) {
    case "USD":
      return Currency.USD;
    case "CAD":
      return Currency.CAD;
    case "MXN":
      return Currency.MXN;
    case "AUD":
      return Currency.AUD;
    case "EUR":
      return Currency.EUR;
    case "GBP":
      return Currency.GBP;
    }
  }
}