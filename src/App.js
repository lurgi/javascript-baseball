const { Console, Random } = require("@woowacourse/mission-utils");

class App {
  play() {
    const COM_VALUE = Random.pickNumberInRange(1, 999);
    const user_values = [];

    while (true) {
      //입력값 주어지지 않을 때 break;
      const USER_VALUES_NUM = user_values.length;
      Console.readLine("유저 값 입력", (user_value) => {
        user_values.push(user_value);
      });
      if (USER_VALUES_NUM === user_values.length) break;

      // 입력값 유효성 검사
      const CUR_USER_VALUE = user_values[user_values.length - 1];
      try {
        this.valueValidation(CUR_USER_VALUE);
      } catch (err) {
        throw err;
      }

      // 컴퓨터 값과 유저값 비교, 볼과 스트라이크 개수 반환.
      const { ball: BALL, strike: STRIKE } = this.compareValues(
        COM_VALUE,
        CUR_USER_VALUE
      );

      Console.print(`${BALL}볼 ${STRIKE}스트라이크`);
    }
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
    const COM_ARR = com_value.toString().split("");
    while (COM_ARR.length < 3) COM_ARR.unshift("0");
    const USER_ARR = user_value.toString().split("");
    while (USER_ARR.length < 3) USER_ARR.unshift("0");

    let ball = 0;
    let strike = 0;

    USER_ARR.forEach((user_num, user_index) => {
      COM_ARR.forEach((com_num, com_index) => {
        if (user_index === com_index) {
          if (user_num === com_num) strike++;
        } else if (user_num === com_num) ball++;
      });
    });

    return { ball, strike };
  }
}

module.exports = App;
