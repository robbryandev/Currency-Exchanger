export enum Currency {
  USD,
  CAD,
  MXN,
  AUD,
  EUR,
  GBP, 
  AED,
  AFN,
  ALL,
  AMD,
  ANG,
  AOA,
  ARS,
  AWG,
  AZN,
  BAM,
  BBD,
  BDT,
  BGN,
  BHD,
  BIF,
  BMD,
  BND,
  BOB,
  BRL,
  BSD,
  BTN,
  BWP,
  BYN,
  BZD,
  CDF,
  CHF,
  CLP,
  CNY,
  COP,
  CRC,
  CUP,
  CVE,
  CZK,
  DJF,
  DKK,
  DOP,
  DZD,
  EGP,
  ERN,
  ETB,
  FJD,
  FKP,
  FOK,
  GEL,
  GGP,
  GHS,
  GIP,
  GMD,
  GNF,
  GTQ,
  GYD,
  HKD,
  HNL,
  HRK,
  HTG,
  HUF,
  IDR,
  ILS,
  IMP,
  INR,
  IQD,
  IRR,
  ISK,
  JEP,
  JMD,
  JOD,
  JPY,
  KES,
  KGS,
  KHR,
  KID,
  KMF,
  KRW,
  KWD,
  KYD,
  KZT,
  LAK,
  LBP,
  LKR,
  LRD,
  LSL,
  LYD,
  MAD,
  MDL,
  MGA,
  MKD,
  MMK,
  MNT,
  MOP,
  MRU,
  MUR,
  MVR,
  MWK,
  MYR,
  MZN,
  NAD,
  NGN,
  NIO,
  NOK,
  NPR,
  NZD,
  OMR,
  PAB,
  PEN,
  PGK,
  PHP,
  PKR,
  PLN,
  PYG,
  QAR,
  RON,
  RSD,
  RUB,
  RWF,
  SAR,
  SBD,
  SCR,
  SDG,
  SEK,
  SGD,
  SHP,
  SLE,
  SLL,
  SOS,
  SRD,
  SSP,
  STN,
  SYP,
  SZL,
  THB,
  TJS,
  TMT,
  TND,
  TOP,
  TRY,
  TTD,
  TVD,
  TWD,
  TZS,
  UAH,
  UGX,
  UYU,
  UZS,
  VES,
  VND,
  VUV,
  WST,
  XAF,
  XCD,
  XDR,
  XOF,
  XPF,
  YER,
  ZAR,
  ZMW,
  ZWL
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

  async getValue(): Promise<number | boolean> {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${Money.curList[this.from]}`;
    return new Promise((resolve) => {
      const mKey = localStorage.getItem(`money-${Money.curList[this.from]}`);
      if (mKey) {
        const mJson = JSON.parse(mKey);
        resolve(this.formatValue(mJson[Money.curList[this.to]]));
      } else {
        fetch(url)
          .then((res) => {
            if (res.ok) {
              res.json()
                .then((jres) => {
                  const data = jres.conversion_rates;
                  localStorage.setItem(`money-${Money.curList[this.from]}`, JSON.stringify(data));
                  resolve(this.formatValue(data[Money.curList[this.to]]));
                });
            } else {
              resolve(false);
            }
          });
      }
    });
  }

  formatValue(newVal: string): number {
    const num = parseFloat(newVal) * this.val;
    return num;
  }

  static getCurrencies(): string[] {
    const res: string[] = [];
    for (let c = 0; c < Object.keys(Currency).length / 2; c++) {
      res.push(Currency[c]);
    }
    return res;
  }

  static toCurrency(val: string) {
    return (<any>Currency)[val];
  }
}