/*global $*/
// JSLintにグローバル変数$を使用することを宣言

$(document).ready(function(){
  
  // 入力された数字をメモリとディスプレイに加える関数
  function addInputNumber(displayedNumbersString, inputNumberPosition,
                          inputNumberString, displayedSymbol, $display) {
    if (displayedNumbersString[inputNumberPosition].includes(".")) {  // 数値2に小数点が含まれている場合
      displayedNumbersString[inputNumberPosition] += inputNumberString;
      $display.text(displayedNumbersString[0]
                    + displayedSymbol + displayedNumbersString[1]);
    } else {
      displayedNumbersString[inputNumberPosition] = String(Number(
        displayedNumbersString[inputNumberPosition] + inputNumberString)); // 0始まりとならないようにするため
      $display.text(displayedNumbersString[0]
                    + displayedSymbol + displayedNumbersString[1]);
    }
    return displayedNumbersString[inputNumberPosition];
  }
  
  // 加算
  function addNumbers(num1, num2) {
    return num1 + num2;
  }
  
  // 減算
  function subtractNumbers(num1, num2) {
    return num1 - num2;
  }
  
  // 乗算
  function multiplyNumbers(num1, num2) {
    return num1 * num2;
  }
  
  // 除算
  function divideNumbers(num1, num2) {
    return num1 / num2;
  }
  
  // 計算を実行しディスプレイに表示する関数
  function showCalculatedResult(inputNumbersString, inputFunc, $display) {
    const numbers = inputNumbersString.map(Number);
    const calculatedResultString = String(inputFunc(numbers[0], numbers[1]));
    $display.text(calculatedResultString);
    return [calculatedResultString, ""];
  }
  
  // メモリをリセットする関数
  function clearMemory() {
    const numbers = ["", ""];
    const operatorDictionary = {func: null, symbol: ""};
    return [numbers, operatorDictionary];
  }
  
  // --------------------------------------------------------------------------
  // main
  // --------------------------------------------------------------------------
  const $display = $("#display");
  const $buttonNumber = $(".button-number");
  const $buttonDecimalPoint = $("#button-decimal-point");
  const $buttonOperator = $(".button-operator");
  const $buttonEqual = $("#button-equal");
  const $buttonAllClear = $("#button-all-clear");
  
  let memoriedNumbers = ["", ""];
  let memoriedOperator = {func: null, symbol: ""};
  
  // 数字のボタンをクリックしたときの動作
  $buttonNumber.click(function() {
    switch (memoriedOperator.symbol) {
      case "=":  // =を押した状態（演算子入力待ち）の場合
        break;
      case "":  // 数値1の入力状態の場合
        memoriedNumbers[0] = addInputNumber(memoriedNumbers, 0, $(this).text(),
                                            memoriedOperator.symbol, $display);
        break;
      default:  // 数値2の入力状態の場合
        memoriedNumbers[1] = addInputNumber(memoriedNumbers, 1, $(this).text(),
                                            memoriedOperator.symbol, $display);
    }
  });
  
  // 小数点のボタンをクリックしたときの動作
  $buttonDecimalPoint.click(function() {
    switch (memoriedOperator.symbol) {
      case "=":  // =を押した状態（演算子入力待ち）の場合
        break;
      case "":  // 数値1の入力状態の場合
        if (memoriedNumbers[0] === "") {  // 数値1が未入力の場合
          memoriedNumbers[0] = "0.";
          $display.text(memoriedNumbers[0]);
        } else if (memoriedNumbers[0].includes(".")) {  // 数値1に小数点が含まれている場合
          return;
        } else {
          memoriedNumbers[0] += $(this).text();
          $display.text(memoriedNumbers[0]);
        }
        break;
      default:  // 数値2の入力状態の場合
        if (memoriedNumbers[1] === "") {  // 数値2が未入力の場合
          memoriedNumbers[1] = "0.";
          $display.text(memoriedNumbers[0] + memoriedOperator.symbol + memoriedNumbers[1]);
        } else if (memoriedNumbers[1].includes(".")) {  // 数値2に小数点が含まれている場合
          return;
        } else {
          memoriedNumbers[1] += $(this).text();
          $display.text(memoriedNumbers[0] + memoriedOperator.symbol + memoriedNumbers[1]);
        }
    }
  });
  
  // 四則演算の演算子をクリックしたときの動作
  $buttonOperator.click(function() {
    if (memoriedNumbers[0] === "" // 数値1に何も入力されていない場合
        || memoriedNumbers[0].slice(-1) === "." // または数値1の最後が小数点の場合
        || memoriedNumbers[1] !== "") {  // または数値2に何か入力されている場合
      return;
    } else {
      const symbol = $(this).text();
      $display.text(memoriedNumbers[0] + symbol);
      memoriedOperator.symbol = symbol;
      switch (symbol) {
        case "+":
          memoriedOperator.func = addNumbers;
          break;
        case "-":
          memoriedOperator.func = subtractNumbers;
          break;
        case "*":
          memoriedOperator.func = multiplyNumbers;
          break;
        case "/":
          memoriedOperator.func = divideNumbers;
          break;
      }
    }
  });
  
  // =ボタンを押したときの動作
  $buttonEqual.click(function() {
    if (memoriedNumbers[1] !== "" && memoriedNumbers[1].slice(-1) !== ".") { // 数値2に何か入力されており、かつ最後が小数点でない場合
      if (Number(memoriedNumbers[1]) === 0 && memoriedOperator.symbol === "/") { // 0除算の場合
        $display.text("error");
        [memoriedNumbers, memoriedOperator] = clearMemory();
      } else {
        memoriedNumbers = showCalculatedResult(
                            memoriedNumbers, memoriedOperator.func, $display);
        memoriedOperator.func = null;
        memoriedOperator.symbol = "=";
      }
    }
  });
  
  // ACボタンを押したときの動作
  $buttonAllClear.click(function() {
    $display.text(0);
    [memoriedNumbers, memoriedOperator] = clearMemory();
  });
});