import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets } from "lucide-react";

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  description: string;
  windSpeed: number;
}

interface WeatherCardProps {
  district: string;
}

export default function WeatherCard({ district }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock weather data for demonstration
  useEffect(() => {
    if (district) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setWeather({
          location: district,
          temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
          humidity: Math.floor(Math.random() * 30) + 60, // 60-90%
          description: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain"][Math.floor(Math.random() * 4)],
          windSpeed: Math.floor(Math.random() * 10) + 5, // 5-15 km/h
        });
        setLoading(false);
      }, 1000);
    }
  }, [district]);

  const getWeatherIcon = (description: string) => {
    switch (description) {
      case "Sunny": return <Sun className="h-8 w-8 text-accent animate-glow" />;
      case "Partly Cloudy": return <Cloud className="h-8 w-8 text-muted-foreground" />;
      case "Cloudy": return <Cloud className="h-8 w-8 text-muted-foreground" />;
      case "Light Rain": return <CloudRain className="h-8 w-8 text-primary" />;
      default: return <Sun className="h-8 w-8 text-accent" />;
    }
  };

  if (!district) {
    return (
      <Card className="bg-gradient-earth shadow-soft border-border">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">कृपया पहले अपना जिला चुनें</p>
          <p className="text-sm text-muted-foreground">Please select your district first</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-earth shadow-elevated border-border hover:shadow-glow transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <span>मौसम की जानकारी | Weather Info</span>
          {weather && getWeatherIcon(weather.description)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        ) : weather ? (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground">{weather.location}</h3>
              <p className="text-3xl font-bold text-primary">{weather.temperature}°C</p>
              <p className="text-muted-foreground">{weather.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 bg-background rounded-lg p-3 shadow-soft">
                <Droplets className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="font-semibold text-foreground">{weather.humidity}%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-background rounded-lg p-3 shadow-soft">
                <Wind className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Wind</p>
                  <p className="font-semibold text-foreground">{weather.windSpeed} km/h</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}