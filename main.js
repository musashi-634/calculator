/*global $*/
// JSLintにグローバル変数$を使用することを宣言

$(document).ready(function(){
  
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
  function showCalculatedResult(inputNumbers, inputFunc, $display) {
    const calculatedResult = inputFunc(inputNumbers[0], inputNumbers[1]);
    $display.text(calculatedResult);
    return [calculatedResult, null];
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
  
  let memoriedNumbers = [null, null];
  let memoriedOperator = {func: null, symbol: null};
  
  // 数字のボタンをクリックしたときの動作   小数点以下の0が入力できない！！！！！
  $buttonNumber.click(function() {
    if (memoriedOperator.symbol === "=") {  // =を押した状態（演算子入力待ち）の場合
      return;
    } else if (memoriedOperator.symbol === null) {  // 数値1の入力状態の場合
      if (memoriedNumbers[0] === null) {  //数値1が未入力の場合
        memoriedNumbers[0] = Number($(this).text());
        $display.text(memoriedNumbers[0]);
      } else {  // 数値1に何か入力されている場合
        memoriedNumbers[0] = Number(memoriedNumbers[0] + $(this).text());
        $display.text(memoriedNumbers[0]);
      }
    } else {  // 数値2の入力状態の場合
      if (memoriedNumbers[1] === null) {  //数値2が未入力の場合
        memoriedNumbers[1] = Number($(this).text());
        $display.text(memoriedNumbers[0] + memoriedOperator.symbol + memoriedNumbers[1]);
      } else {  // 数値2に何か入力されている場合
        memoriedNumbers[1] = Number(memoriedNumbers[1] + $(this).text());
        $display.text(memoriedNumbers[0] + memoriedOperator.symbol + memoriedNumbers[1]);
      }
    }
  });
  
  // 小数点のボタンをクリックしたときの動作
  $buttonDecimalPoint.click(function() {
    if (memoriedOperator.symbol === "=") {  // =を押した状態（演算子入力待ち）の場合
      return;
    } else if (memoriedOperator.symbol === null) {  // 数値1の入力状態の場合
      if (memoriedNumbers[0] === null) {  // 数値1が未入力の場合
        memoriedNumbers[0] = "0" + $(this).text(); // 小数点の場合のみString型となる
        $display.text(memoriedNumbers[0]);
      } else {  // 数値1に何か入力されている場合
        memoriedNumbers[0] = memoriedNumbers[0] + $(this).text(); // 小数点の場合のみString型となる
        $display.text(memoriedNumbers[0]);
      }
    } else {  // 数値2の入力状態の場合
      if (memoriedNumbers[1] === null) {  // 数値2が未入力の場合
        memoriedNumbers[1] = "0" + $(this).text(); // 小数点の場合のみString型となる
        $display.text(memoriedNumbers[0] + memoriedOperator.symbol + memoriedNumbers[1]);
      } else {  // 数値2に何か入力されている場合
        memoriedNumbers[1] = memoriedNumbers[1] + $(this).text(); // 小数点の場合のみString型となる
        $display.text(memoriedNumbers[0] + memoriedOperator.symbol + memoriedNumbers[1]);
      }
    }
  });
  
  // 四則演算の演算子をクリックしたときの動作
  $buttonOperator.click(function() {
    if (typeof(memoriedNumbers[0]) !== "string") {  // 数値1の最後が小数点でない場合
      const symbol = $(this).text();
      $display.text(memoriedNumbers[0] + symbol);
      memoriedOperator.symbol = symbol;
      if (symbol === "+") {
        memoriedOperator.func = addNumbers;
      } else if (symbol === "-") {
        memoriedOperator.func = subtractNumbers;
      } else if (symbol === "*") {
        memoriedOperator.func = multiplyNumbers;
      } else if (symbol === "/") {
        memoriedOperator.func = divideNumbers;
      }
    }
  });
  
  // =ボタンを押したときの動作
  $buttonEqual.click(function() {
    if (memoriedOperator.symbol !== null) { // 数値2の入力状態の場合
      if (typeof(memoriedNumbers[1]) === "string") { // 数値2の最後が小数点の場合
        if (memoriedNumbers[1].slice(0, -1) === "0"
          && memoriedOperator.symbol === "/") { // 数値2が0.かつ除算の場合
          $display.text("error");
          memoriedNumbers = [null, null];
          memoriedOperator.func = null;
          memoriedOperator.symbol = null;
        } else {
          memoriedNumbers[1] = Number(memoriedNumbers[1].slice(0, -1));
          memoriedNumbers = showCalculatedResult(memoriedNumbers, memoriedOperator.func, $display);
          memoriedOperator.func = null;
          memoriedOperator.symbol = "=";
        }
      } else if (memoriedNumbers[1] === 0 && memoriedOperator.symbol === "/") {  // 数値2が0かつ除算の場合
        $display.text("error");
        memoriedNumbers = [null, null];
        memoriedOperator.func = null;
        memoriedOperator.symbol = null;
      } else {
        memoriedNumbers = showCalculatedResult(memoriedNumbers, memoriedOperator.func, $display);
        memoriedOperator.func = null;
        memoriedOperator.symbol = "=";
      }
    }
  });
  
  // ACボタンを押したときの動作
  $buttonAllClear.click(function() {
    $display.text(0);
    memoriedNumbers = [null, null];
    memoriedOperator.func = null;
    memoriedOperator.symbol = null;
  });
});