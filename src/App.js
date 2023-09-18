const { Console } = require("@woowacourse/mission-utils");

class App {
  play() {
    let COM_VALUE;
    let user_values = [];
    Console.readLine("컴퓨터 값 입력", (computer_value) => {
      COM_VALUE = computer_value;
    });
    //여기서 반복문 들어가기.
    /*
    1. 유저 값의 유효성 검사
    2. 값을 알아 냈을 때 끝내기.
    */
    Console.readLine("유저 값 입력", (user_value) => {
      user_values.push(user_value);
    });
    const CUR_USER_VALUE = user_values[user_values.length];

    try {
      this.valueValidation(CUR_USER_VALUE);
    } catch (err) {
      throw err;
    }

    this.compareValues(COM_VALUE, CUR_USER_VALUE);
  }

  valueValidation(value) {
    if (parseInt(value) === NaN) {
      throw new Error("입력값은 숫자형식만 가능합니다.");
    }

    if (value.length === 0 || value.length > 3) {
      throw new Error("입력값은 1이상 1000이하 이어야 합니다.");
    }
  }

  compareValues(com_value, user_value) {
    const COM_ARR = com_value.split("");
    const USER_ARR = user_value.split("");

    let ball = 0;
    let strike = 0;
  }
}

module.exports = App;
