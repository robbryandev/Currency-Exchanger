import "bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/styles.css";

import * as $ from "jquery";
import AlertMagic from "sweetalert2";

import Money from "./scripts/money";

const curSelect = $("#curr");
const curSelect2 = $("#curr2");
const selects = [curSelect, curSelect2];
for (let c = 0; c < Money.curList.length; c++) {
  for (let s = 0; s < selects.length; s++) {
    const newOpt = $(`
      <option>${Money.curList[c]}</option>
    `);
    newOpt.appendTo(selects[s]);
  }
}

$("form").on("submit", (event) => {
  event.preventDefault();
  const valNum = parseFloat(`${$("#amount").val()}`);
  const valFrom = Money.toCurrency(`${curSelect.val()}`);
  const valTo = Money.toCurrency(`${curSelect2.val()}`);

  const resultBox = $("#result-box");
  const convert = new Money(valNum, valFrom, valTo);
  convert.getValue()
    .then((res) => {
      if (typeof res !== "boolean") {
        const valStr: number = res;
        resultBox.html(`<h1>${curSelect2.val()}: ${valStr}</h1>`);
        console.log(valStr);
      } else {
        AlertMagic.fire({
          title: "Error",
          text: "There was an error handling your request. Try checking your api key",
          icon: "error"
        });
      }
    });
});