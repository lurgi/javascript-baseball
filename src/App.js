const { Console, Random } = require("@woowacourse/mission-utils");

class App {
  async play() {
    const COM_VALUE = parseInt(
      [
        Random.pickNumberInRange(1, 9),
        Random.pickNumberInRange(1, 9),
        Random.pickNumberInRange(1, 9),
      ].join("")
    );

    while (true) {
      const CUR_USER_VALUE = await this.getUserValue();

      // 입력값 유효성 검사
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

      //메세지 출력
      this.printMessage(BALL, STRIKE);

      //정답시 끝내기
      if (STRIKE === 3) {
        this.printEnd();
        break;
      }
    }
  }
  //유저의 값을 입력받습니다.
  getUserValue() {
    return new Promise((resolve) => {
      Console.readLine("유저 값 입력", (user_input) => {
        resolve(user_input);
      });
    });
  }

  //유저가 입력한 값의 유효성 검사를 실시합니다.
  valueValidation(value) {
    if (parseInt(value) === NaN) {
      throw new Error("입력값은 숫자형식만 가능합니다.");
    }
    if (value.length !== 3) {
      throw new Error("입력값은 100이상 999이하 이어야 합니다.");
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

  printMessage(ball, strike) {
    if (ball === 0 && strike === 0) Console.print("낫싱");
    else if (ball === 0) Console.print(`${strike}스트라이크`);
    else if (strike === 0) Console.print(`${ball}볼`);
    else Console.print(`${ball}볼 ${strike}스트라이크`);
  }

  printEnd() {
    console.log("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
    Console.readLine(
      "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.",
      (input) => {
        if (input.toString() === "1") this.play();
        else if (input.toString() === "2") Console.print("게임 종료");
      }
    );
  }
}

module.exports = App;
