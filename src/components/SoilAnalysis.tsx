import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Droplets, Beaker, Loader2, Satellite } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SoilData {
  ph: number;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  recommendations: string[];
  recommendationsHindi: string[];
}

interface SoilAnalysisProps {
  district: string;
}

export default function SoilAnalysis({ district }: SoilAnalysisProps) {
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalysis = async () => {
    if (!district) {
      toast({
        title: "जिला चुनें | Select District",
        description: "कृपया पहले अपना जिला चुनें | Please select your district first",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    
    // Simulate satellite data analysis
    setTimeout(() => {
      const mockSoilData: SoilData = {
        ph: Number((Math.random() * 3 + 5.5).toFixed(1)), // 5.5-8.5
        moisture: Math.floor(Math.random() * 40 + 30), // 30-70%
        nitrogen: Math.floor(Math.random() * 40 + 20), // 20-60 kg/ha
        phosphorus: Math.floor(Math.random() * 25 + 10), // 10-35 kg/ha
        potassium: Math.floor(Math.random() * 60 + 40), // 40-100 kg/ha
        organicMatter: Number((Math.random() * 2 + 1).toFixed(1)), // 1-3%
        recommendations: [
          "Apply organic compost to improve soil structure",
          "Consider lime application to adjust pH",
          "Implement crop rotation with legumes",
          "Use precision fertilization techniques"
        ],
        recommendationsHindi: [
          "मिट्टी की संरचना सुधारने के लिए जैविक खाद डालें",
          "pH समायोजन के लिए चूना लगाने पर विचार करें",
          "दलहनी फसलों के साथ फसल चक्र अपनाएं",
          "सटीक उर्वरीकरण तकनीक का उपयोग करें"
        ]
      };
      
      setSoilData(mockSoilData);
      setAnalyzing(false);
      
      toast({
        title: "मिट्टी विश्लेषण पूर्ण | Soil Analysis Complete",
        description: `${district} जिले के लिए उपग्रह डेटा से विश्लेषण | Analysis from satellite data for ${district}`,
      });
    }, 4000);
  };

  const getParameterStatus = (value: number, min: number, max: number) => {
    if (value < min) return { status: "Low", color: "bg-destructive text-destructive-foreground" };
    if (value > max) return { status: "High", color: "bg-accent text-accent-foreground" };
    return { status: "Optimal", color: "bg-primary text-primary-foreground" };
  };

  const phStatus = soilData ? getParameterStatus(soilData.ph, 6.0, 7.5) : null;
  const moistureStatus = soilData ? getParameterStatus(soilData.moisture, 40, 60) : null;

  return (
    <Card className="bg-gradient-earth shadow-elevated border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Satellite className="h-5 w-5 text-primary" />
          मिट्टी विश्लेषण | Soil Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          उपग्रह डेटा से मिट्टी की गुणवत्ता | Soil quality from satellite data
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!soilData ? (
          <div className="text-center py-8">
            <Satellite className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-float" />
            <p className="text-muted-foreground mb-4">
              {district ? `${district} जिले के लिए मिट्टी विश्लेषण | Soil analysis for ${district}` : "पहले जिला चुनें | Select district first"}
            </p>
            <Button
              onClick={handleAnalysis}
              disabled={!district || analyzing}
              variant="hero"
              size="lg"
            >
              {analyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  विश्लेषण हो रहा है... | Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  मिट्टी का विश्लेषण करें | Analyze Soil
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* pH and Moisture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background rounded-lg p-4 shadow-soft border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Beaker className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">pH Level</span>
                  </div>
                  {phStatus && <Badge className={phStatus.color}>{phStatus.status}</Badge>}
                </div>
                <p className="text-2xl font-bold text-primary">{soilData.ph}</p>
                <Progress value={(soilData.ph / 14) * 100} className="mt-2" />
              </div>

              <div className="bg-background rounded-lg p-4 shadow-soft border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">Moisture</span>
                  </div>
                  {moistureStatus && <Badge className={moistureStatus.color}>{moistureStatus.status}</Badge>}
                </div>
                <p className="text-2xl font-bold text-primary">{soilData.moisture}%</p>
                <Progress value={soilData.moisture} className="mt-2" />
              </div>
            </div>

            {/* NPK Values */}
            <div className="bg-background rounded-lg p-4 shadow-soft border border-border">
              <h3 className="font-semibold text-foreground mb-4">पोषक तत्व | Nutrients (kg/ha)</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">N</span>
                  </div>
                  <p className="font-semibold text-foreground">{soilData.nitrogen}</p>
                  <p className="text-xs text-muted-foreground">Nitrogen</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-harvest rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-accent-foreground font-bold">P</span>
                  </div>
                  <p className="font-semibold text-foreground">{soilData.phosphorus}</p>
                  <p className="text-xs text-muted-foreground">Phosphorus</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-foreground font-bold">K</span>
                  </div>
                  <p className="font-semibold text-foreground">{soilData.potassium}</p>
                  <p className="text-xs text-muted-foreground">Potassium</p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-background rounded-lg p-4 shadow-soft border border-border">
              <h3 className="font-semibold text-foreground mb-3">सिफारिशें | Recommendations</h3>
              <div className="space-y-3">
                {soilData.recommendations.map((rec, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <p className="text-sm text-foreground">{rec}</p>
                    <p className="text-sm text-muted-foreground">{soilData.recommendationsHindi[index]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}