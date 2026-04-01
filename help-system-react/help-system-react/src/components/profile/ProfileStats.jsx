import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import Card from '../ui/Card';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function ProfileStats({ stats }) {
  const pieData = {
    labels: ['Pendente', 'Em Andamento', 'Resolvido'],
    datasets: [
      {
        data: [stats.pending, stats.inProgress, stats.resolved],
        backgroundColor: ['#eab308', '#3b82f6', '#10b981'],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ['Solicitações', 'Respostas'],
    datasets: [
      {
        label: 'Total',
        data: [stats.total, stats.responses],
        backgroundColor: ['#6366f1', '#a855f7'],
        borderRadius: 8,
      },
    ],
  };

  return (
    <>
      <Card className="p-8 mb-6">
        <h3 className="section-title">Estatísticas Gerais</h3>
        <div className="stats-mini-grid">
          <div className="stat-card-mini bg-blue-50"><span className="value">{stats.total}</span><span className="label">Total Solicitações</span></div>
          <div className="stat-card-mini bg-yellow-50"><span className="value">{stats.pending}</span><span className="label">Pendentes</span></div>
          <div className="stat-card-mini bg-purple-50"><span className="value">{stats.inProgress}</span><span className="label">Em Andamento</span></div>
          <div className="stat-card-mini bg-green-50"><span className="value">{stats.resolved}</span><span className="label">Resolvidas</span></div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-6 responsive-two-cols">
        <Card className="p-6">
          <h4 className="text-center mb-4 text-sm font-bold">Status das Solicitações</h4>
          <div className="chart-container"><Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} /></div>
        </Card>
        <Card className="p-6">
          <h4 className="text-center mb-4 text-sm font-bold">Atividade Geral</h4>
          <div className="chart-container"><Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }, plugins: { legend: { display: false } } }} /></div>
        </Card>
      </div>
    </>
  );
}
