// Bento plan: 6 cards → grid-cols-4
// Row 1: CropHealthScore (spans 2 cols, tall) + WeatherCard (spans 2 cols) 
// Row 2: ActiveScans (1 col) + DiseasesDetected (1 col) + AvgConfidence (1 col) + TreatmentRate (1 col)
import CropHealthScoreCard from './CropHealthScoreCard';
import WeatherCard from './WeatherCard';
import StatMiniCard from './StatMiniCard';

export default function MetricsBentoGrid() {
  const miniStats = [
    { id: 'stat-active-scans', label: 'Active Scans', value: '24', unit: 'this month', trend: '+3 today', trendUp: true, icon: '🔬' },
    { id: 'stat-diseases', label: 'Diseases Detected', value: '7', unit: 'unique types', trend: '2 critical', trendUp: false, icon: '🦠' },
    { id: 'stat-confidence', label: 'Avg AI Confidence', value: '91.4', unit: '%', trend: '+2.1% vs last week', trendUp: true, icon: '🎯' },
    { id: 'stat-treatment', label: 'Treatment Rate', value: '68', unit: '% scans treated', trend: '5 untreated', trendUp: false, icon: '💊' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {/* Hero: Crop Health Score — spans 2 cols on lg+ */}
      <div className="md:col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
        <CropHealthScoreCard />
      </div>
      {/* Weather Card — spans 2 cols on lg+ */}
      <div className="md:col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
        <WeatherCard />
      </div>
      {/* 4 mini stat cards */}
      {miniStats?.map((stat) => (
        <StatMiniCard key={stat?.id} {...stat} />
      ))}
    </div>
  );
}