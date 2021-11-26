import _ from "lodash";

export interface ILegends {
  title: string
  color: string
};

export const getLegends = (labels: string[], colors: string[] = ['bg-teal-500', 'bg-blue-600']): ILegends[] => {
  const data = _.zip(labels, colors);
  return data.map(v => ({
    title: v[0]!, color: v[1]!
  }));
}

// Bar chart functions
export const getBarChartData = (data: number[][], chatYlabels: string[], labels: string[], colors: string[] = ['#0694a2', '#1c64f2']) => {
  return {
    labels: chatYlabels,
    datasets: _.zip(labels, data, colors).map(v => ({
          label: v[0],
          backgroundColor: v[2],
          // borderColor: window.chartColors.red,
          borderWidth: 1,
          data: v[1],
          maxBarThickness: 20
        }))
  };
};

export const barOptions = {
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
};

// Doughnut chart functions
export const doughnutOptions = {
  options: {
    responsive: true,
    cutoutPercentage: 80,
  },
  legend: {
    display: false,
  },
};

export const getDoughnutData = (data: number[], labels: string[], colors: string[] = ['#0694a2', '#1c64f2']) => ({
  datasets: [
    {
      data: data,
      /**
       * These colors come from Tailwind CSS palette
       * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
       */
      backgroundColor: colors,
    },
  ],
  labels: labels,
});