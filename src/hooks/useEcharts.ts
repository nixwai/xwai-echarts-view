import { onMounted, Ref, watch } from 'vue';
import echarts from '@/echarts';

/**
 * echarts绘制
 * @param dom:需要绘制的dom
 * @param option:绘制配置内容
 * @returns {clearChart}: 清除绘制内容的方法
 */
export function useEcharts({
  dom,
  option
}: {
  dom: Ref<HTMLElement | undefined>;
  option: echarts.EChartsCoreOption;
}): { clearChart: () => void; showLoading: () => void; hideLoading: () => void } {
  let myChart: echarts.ECharts | null = null;

  onMounted(() => {
    if (dom.value) {
      myChart = echarts.init(dom.value);
      // 使用配置项和数据显示图表。
      myChart.setOption(option);
      // 窗口调整时，控制大小
      window.addEventListener('resize', () => {
        myChart?.resize();
      });
    }
  });

  // 监听option配置，变化重绘图表
  watch(
    () => option,
    (val) => {
      myChart?.setOption(val);
    },
    {
      deep: true
    }
  );

  /**
   * 清除图表
   */
  function clearChart() {
    myChart?.clear();
  }

  /**
   * 显示加载
   */
  function showLoading() {
    myChart?.showLoading();
  }

  /**
   * 隐藏加载
   */
  function hideLoading() {
    myChart?.hideLoading();
  }

  return { clearChart, showLoading, hideLoading };
}
