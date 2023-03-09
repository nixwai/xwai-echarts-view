/** 策略模式 [状态, 为true时执行的回调函数] */
export type StrategyAction = [boolean, () => void];

/**
 * 执行策略模式 (类似状态机)
 * @param actions 策略列表
 * @returns 是否有执行的策略
 */
export function exeStrategyActions(actions: StrategyAction[]) {
  return actions.some((item) => {
    const [flag, action] = item;
    if (flag) {
      action();
    }
    return flag;
  });
}
