import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js'
import {Pie} from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

const chartOptions: any = {
    plugins: {
        datalabels: {
            color: '#fff',
            anchor: 'end', // ラベルをグラフの外側に表示
            align: 'start', // ラベルの位置を調整
            offset: 100, // ラベルのオフセットを調整
            clamp: true, // ラベルをグラフの内側に制限
            font: {
                size: 24, // フォントサイズを調整
                weight: 'bold' // フォントウェイトを調整
            },
            formatter(value: any) {
                if (value === null || value === 0) {
                return '';
                }
                return `${value}%`
            },
        },
        layout: {
            padding: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20
            }
        },
    }
}

const PieChart = () => {
  ChartJS.register(ArcElement, Tooltip, Legend)
  const data = {
    labels: ['奥州ロマン', 'シナノゴールド', 'ピンクレディ', 'ブラムリー'],
    datasets: [
      {
        label: '%',
        data: [1, 5, 3, 2],
        backgroundColor: [
          'firebrick', 'gold', 'pink', 'mediumseagreen'
        ],
        borderColor: [
          'firebrick', 'gold', 'pink', 'mediumseagreen'
        ],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="App">
        {/* @ts-ignore */} 
        <Pie data={data} options={chartOptions} plugins={[ChartDataLabels]}/>
    </div>
  )
}

export default PieChart