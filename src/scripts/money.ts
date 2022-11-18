enum Currency {
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
  constructor(val: number, to: Currency) {
    this.val = val;
    this.to = to;
  }
}