import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DetectionResult {
  disease: string;
  diseaseHindi: string;
  confidence: number;
  severity: "Low" | "Medium" | "High";
  treatment: string;
  treatmentHindi: string;
}

export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetection = async () => {
    if (!selectedImage) {
      toast({
        title: "कोई तस्वीर नहीं | No Image",
        description: "कृपया पहले एक तस्वीर अपलोड करें | Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setDetecting(true);
    
    // Simulate ML model detection
    setTimeout(() => {
      const mockResults: DetectionResult[] = [
        {
          disease: "Leaf Spot",
          diseaseHindi: "पत्ती धब्बा रोग",
          confidence: 87,
          severity: "Medium",
          treatment: "Apply copper-based fungicide every 7-10 days",
          treatmentHindi: "तांबा आधारित कवकनाशी का छिड़काव करें"
        },
        {
          disease: "Healthy Plant",
          diseaseHindi: "स्वस्थ पौधा",
          confidence: 92,
          severity: "Low",
          treatment: "Continue regular care and monitoring",
          treatmentHindi: "नियमित देखभाल जारी रखें"
        },
        {
          disease: "Bacterial Blight",
          diseaseHindi: "बैक्टीरियल ब्लाइट",
          confidence: 78,
          severity: "High",
          treatment: "Remove infected parts and apply bactericide",
          treatmentHindi: "संक्रमित भाग हटाएं और जीवाणुनाशक लगाएं"
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setDetecting(false);
      
      toast({
        title: "विश्लेषण पूर्ण | Analysis Complete",
        description: `${randomResult.confidence}% confidence in detection`,
      });
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-destructive text-destructive-foreground";
      case "Medium": return "bg-accent text-accent-foreground";
      case "Low": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="bg-gradient-earth shadow-elevated border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Camera className="h-5 w-5 text-primary" />
          बीमारी की पहचान | Disease Detection
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          अपनी फसल की तस्वीर अपलोड करें | Upload your crop image
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="hidden"
        />
        
        <div className="space-y-4">
          {selectedImage ? (
            <div className="relative bg-background rounded-lg p-4 shadow-soft border border-border">
              <img 
                src={selectedImage} 
                alt="Uploaded crop" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
              >
                Change Image
              </Button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer bg-background/50"
            >
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">
                तस्वीर अपलोड करने के लिए क्लिक करें
              </p>
              <p className="text-sm text-muted-foreground">
                Click to upload image
              </p>
            </div>
          )}

          <Button
            onClick={handleDetection}
            disabled={!selectedImage || detecting}
            variant="hero"
            className="w-full"
          >
            {detecting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                विश्लेषण हो रहा है... | Analyzing...
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 mr-2" />
                बीमारी की जांच करें | Detect Disease
              </>
            )}
          </Button>

          {result && (
            <div className="bg-background rounded-lg p-4 shadow-soft border border-border space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {result.disease} | {result.diseaseHindi}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Confidence: {result.confidence}%
                  </p>
                </div>
                <Badge className={getSeverityColor(result.severity)}>
                  {result.severity} Risk
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Treatment | उपचार:</p>
                    <p className="text-sm text-muted-foreground">{result.treatment}</p>
                    <p className="text-sm text-muted-foreground">{result.treatmentHindi}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}