/**
 * 补全
 */
function padStart(str: string, count: number, con: string | number): string {
  while (str.length < count) {
    str = con + str;
  }
  return str;
}

/**
 * 获取最近的12个月份
 */
function getMonths(): { xMonths: string[]; timeList: number[] } {
  const date = new Date();
  let m: number = date.getMonth() + 1;
  let y: number = date.getFullYear() - 2;
  let t: number = m + 1;
  let s: number = y;
  const xMonths: string[] = [];
  const timeList: number[] = [];
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 12; i++, m++, t++) {
      if (t > 12) {
        t = 1;
        s += 1;
      }
      if (m > 12) {
        m = 1;
        y += 1;
      }
      xMonths.push(y + '\n' + m + '月');
      timeList.push(
        new Date(s + '-' + padStart(t.toString(), 2, '0') + '-' + '01' + ' 00:00').getTime()
      );
    }
  }
  return { xMonths, timeList };
}

export const { xMonths, timeList } = getMonths();
