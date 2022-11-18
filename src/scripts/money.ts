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
  to: Currency;
  static curList: string[] = Money.getCurrencies();
  constructor(val: number, to: Currency) {
    this.val = val;
    this.to = to;
  }

  async getValue(): Promise<string | boolean> {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;
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
}