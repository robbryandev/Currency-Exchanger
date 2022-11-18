import "bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/styles.css";

import * as $ from "jquery";

import Money from "./scripts/money";

const curSelect = $("#curr");
const curSelect2 = $("#curr2");
for (let c = 0; c < Money.curList.length; c++) {
  const newOpt = $(`
    <option>${Money.curList[c]}</option>
  `);
  newOpt.appendTo(curSelect);
  const newOpt2 = $(`
    <option>${Money.curList[c]}</option>
  `);
  newOpt2.appendTo(curSelect2);
}