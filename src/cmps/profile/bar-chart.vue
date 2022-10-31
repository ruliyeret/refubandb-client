<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  props: { totalEarnings: Array },
  data() {
    return {
      chartdata: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Total earnings',
            data: this.totalEarnings,
            fill: false,
            backgroundColor: '#ff385c',
            tension: 0.1,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontSize: 20,
          },
        },
        width: window.innerWidth > 450 ? 800 : 375,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    }
  },

  mounted() {
    this.renderChart(this.chartdata, this.options)
  },
}
</script>
