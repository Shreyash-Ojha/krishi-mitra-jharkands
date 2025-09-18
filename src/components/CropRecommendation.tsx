import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wheat, Sprout, Calendar, TrendingUp } from "lucide-react";

interface CropData {
  name: string;
  nameHindi: string;
  season: string;
  profitability: "High" | "Medium" | "Low";
  soilType: string;
  growthPeriod: string;
}

interface CropRecommendationProps {
  district: string;
}

const cropData: Record<string, CropData[]> = {
  "Ranchi": [
    { name: "Rice", nameHindi: "धान", season: "Kharif", profitability: "High", soilType: "Loamy", growthPeriod: "120-140 days" },
    { name: "Wheat", nameHindi: "गेहूं", season: "Rabi", profitability: "High", soilType: "Loamy", growthPeriod: "110-130 days" },
    { name: "Maize", nameHindi: "मक्का", season: "Kharif", profitability: "Medium", soilType: "Well-drained", growthPeriod: "90-110 days" },
  ],
  "Dhanbad": [
    { name: "Rice", nameHindi: "धान", season: "Kharif", profitability: "High", soilType: "Clay loam", growthPeriod: "120-140 days" },
    { name: "Sugarcane", nameHindi: "गन्ना", season: "Annual", profitability: "High", soilType: "Rich loamy", growthPeriod: "12-18 months" },
    { name: "Potato", nameHindi: "आलू", season: "Rabi", profitability: "Medium", soilType: "Sandy loam", growthPeriod: "90-120 days" },
  ],
  // Add more districts...
};

export default function CropRecommendation({ district }: CropRecommendationProps) {
  const crops = cropData[district] || cropData["Ranchi"]; // Default to Ranchi data

  const getProfitabilityColor = (profitability: string) => {
    switch (profitability) {
      case "High": return "bg-accent text-accent-foreground";
      case "Medium": return "bg-primary text-primary-foreground";
      case "Low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (!district) {
    return (
      <Card className="bg-gradient-earth shadow-soft border-border">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">जिला चुनने के बाद फसल की सिफारिशें देखें</p>
          <p className="text-sm text-muted-foreground">View crop recommendations after selecting district</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-earth shadow-elevated border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wheat className="h-5 w-5 text-primary" />
          फसल सिफारिशें | Crop Recommendations
        </CardTitle>
        <p className="text-sm text-muted-foreground">{district} जिले के लिए | For {district} District</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {crops.map((crop, index) => (
            <div key={index} className="bg-background rounded-lg p-4 shadow-soft border border-border hover:shadow-elevated transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{crop.name} | {crop.nameHindi}</h3>
                  <p className="text-sm text-muted-foreground">{crop.season} Season</p>
                </div>
                <Badge className={getProfitabilityColor(crop.profitability)}>
                  {crop.profitability} Profit
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Soil:</span>
                  <span className="text-foreground">{crop.soilType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Period:</span>
                  <span className="text-foreground">{crop.growthPeriod}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}