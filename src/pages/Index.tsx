import { useState } from "react";
import { Button } from "@/components/ui/button";
import DistrictSelector from "@/components/DistrictSelector";
import WeatherCard from "@/components/WeatherCard";
import CropRecommendation from "@/components/CropRecommendation";
import DiseaseDetection from "@/components/DiseaseDetection";
import SoilAnalysis from "@/components/SoilAnalysis";
import LanguageSelector from "@/components/LanguageSelector";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Cloud, Camera, Zap, Info } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

const Index = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Header */}
      <header className="bg-gradient-primary shadow-elevated border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-primary-foreground animate-glow" />
              <div>
                <h1 className="text-xl font-bold text-primary-foreground">
                  झारखंड कृषि सहायक | Jharkhand Krishi Sahayak
                </h1>
                <p className="text-sm text-primary-foreground/80">
                  Smart Agriculture Assistant for Jharkhand Farmers
                </p>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-earth">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-foreground leading-tight">
                  स्मार्ट खेती के लिए<br />
                  <span className="text-primary">आधुनिक समाधान</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Modern Solutions for Smart Farming in Jharkhand
                </p>
                <p className="text-muted-foreground">
                  मौसम, मिट्टी और फसल की बीमारी की जानकारी एक ही स्थान पर।
                  Get weather, soil, and crop disease information in one place.
                </p>
              </div>
              
              <div className="pt-4">
                <DistrictSelector 
                  onDistrictChange={setSelectedDistrict}
                  selectedDistrict={selectedDistrict}
                />
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Jharkhand Agriculture" 
                className="rounded-lg shadow-elevated w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="weather" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-background shadow-soft border border-border">
            <TabsTrigger value="weather" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Cloud className="h-4 w-4" />
              <span className="hidden sm:inline">मौसम | Weather</span>
            </TabsTrigger>
            <TabsTrigger value="crops" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Leaf className="h-4 w-4" />
              <span className="hidden sm:inline">फसल | Crops</span>
            </TabsTrigger>
            <TabsTrigger value="disease" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">बीमारी | Disease</span>
            </TabsTrigger>
            <TabsTrigger value="soil" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">मिट्टी | Soil</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weather">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WeatherCard district={selectedDistrict} />
              <Card className="bg-gradient-earth shadow-soft border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">मौसम सुझाव | Weather Tips</h3>
                  </div>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>• बारिश के दिनों में खेत की जल निकासी का ध्यान रखें</p>
                    <p>• Ensure proper drainage during rainy days</p>
                    <p>• गर्मी में सिंचाई सुबह या शाम के समय करें</p>
                    <p>• Irrigate during morning or evening in summer</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="crops">
            <CropRecommendation district={selectedDistrict} />
          </TabsContent>

          <TabsContent value="disease">
            <DiseaseDetection />
          </TabsContent>

          <TabsContent value="soil">
            <SoilAnalysis district={selectedDistrict} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-6 w-6" />
            <span className="text-lg font-semibold">झारखंड कृषि सहायक</span>
          </div>
          <p className="text-primary-foreground/80">
            Empowering farmers with technology and knowledge | किसानों को तकनीक और ज्ञान से सशक्त बनाना
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
