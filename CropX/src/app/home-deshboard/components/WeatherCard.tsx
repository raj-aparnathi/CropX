import React from 'react';
import { Droplets, Wind, CloudRain, Eye } from 'lucide-react';

const WEATHER = {
  location: 'Anand, Gujarat',
  temp: 31,
  feelsLike: 34,
  humidity: 78,
  rainProbability: 35,
  windSpeed: 12,
  windDir: 'SW',
  visibility: 8.4,
  condition: 'Partly Cloudy',
  uvIndex: 7,
  diseaseRisk: 'High',
  riskScore: 0.82,
};

const HOURLY = [
  { id: 'hour-0600', time: '06:00', temp: 27, rain: 10, icon: '🌤️' },
  { id: 'hour-0900', time: '09:00', temp: 29, rain: 15, icon: '⛅' },
  { id: 'hour-1200', time: '12:00', temp: 31, rain: 35, icon: '🌦️' },
  { id: 'hour-1500', time: '15:00', temp: 32, rain: 55, icon: '🌧️' },
  { id: 'hour-1800', time: '18:00', temp: 30, rain: 40, icon: '🌦️' },
  { id: 'hour-2100', time: '21:00', temp: 28, rain: 20, icon: '🌙' },
];

export default function WeatherCard() {
  return (
    <div className="card-base h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Weather · Disease Risk</p>
          <p className="text-sm text-muted-foreground mt-0.5">{WEATHER?.location}</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-severity-high-bg border border-severity-high/30 px-2.5 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-severity-high animate-pulse" />
          <span className="text-xs font-semibold text-severity-high">High Disease Risk</span>
        </div>
      </div>
      {/* Main temp */}
      <div className="flex items-end gap-4 mb-4">
        <div>
          <div className="flex items-start gap-1">
            <span className="text-5xl font-bold tabular-nums text-foreground leading-none">{WEATHER?.temp}</span>
            <span className="text-xl font-semibold text-muted-foreground mt-2">°C</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Feels like {WEATHER?.feelsLike}°C · {WEATHER?.condition}</p>
        </div>
        <div className="text-4xl mb-1">🌦️</div>
      </div>
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2.5">
          <Droplets size={16} className="text-blue-500 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="text-sm font-bold tabular-nums text-foreground">{WEATHER?.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2.5">
          <CloudRain size={16} className="text-blue-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Rain Chance</p>
            <p className="text-sm font-bold tabular-nums text-foreground">{WEATHER?.rainProbability}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2.5">
          <Wind size={16} className="text-muted-foreground flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="text-sm font-bold tabular-nums text-foreground">{WEATHER?.windSpeed} km/h {WEATHER?.windDir}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2.5">
          <Eye size={16} className="text-muted-foreground flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Visibility</p>
            <p className="text-sm font-bold tabular-nums text-foreground">{WEATHER?.visibility} km</p>
          </div>
        </div>
      </div>
      {/* Hourly strip */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 mt-auto">
        {HOURLY?.map((h) => (
          <div key={h?.id} className="flex-shrink-0 flex flex-col items-center gap-1 rounded-xl bg-muted/40 px-3 py-2 min-w-[52px]">
            <span className="text-xs text-muted-foreground font-medium">{h?.time}</span>
            <span className="text-base">{h?.icon}</span>
            <span className="text-xs font-bold tabular-nums text-foreground">{h?.temp}°</span>
            <span className="text-xs text-blue-500 font-medium">{h?.rain}%</span>
          </div>
        ))}
      </div>
      {/* Disease risk bar */}
      <div className="mt-3 rounded-xl bg-severity-high-bg border border-severity-high/20 p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-severity-high">Fungal Disease Risk Score</p>
          <span className="text-xs font-bold tabular-nums text-severity-high">{WEATHER?.riskScore}</span>
        </div>
        <div className="h-2 rounded-full bg-white/60 overflow-hidden">
          <div
            className="h-full rounded-full bg-severity-high"
            style={{ width: `${WEATHER?.riskScore * 100}%` }}
          />
        </div>
        <p className="text-xs text-severity-high/80 mt-1.5">High humidity + rain forecast increases blight risk. Avoid spraying today.</p>
      </div>
    </div>
  );
}