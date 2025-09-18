import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const jharkhandDistricts = [
  "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", 
  "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", 
  "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", 
  "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"
];

interface DistrictSelectorProps {
  onDistrictChange: (district: string) => void;
  selectedDistrict: string;
}

export default function DistrictSelector({ onDistrictChange, selectedDistrict }: DistrictSelectorProps) {
  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-earth shadow-elevated border-border">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-foreground">
          <MapPin className="h-5 w-5 text-primary" />
          अपना जिला चुनें | Select Your District
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={onDistrictChange} value={selectedDistrict}>
          <SelectTrigger className="w-full bg-background border-border text-foreground shadow-soft">
            <SelectValue placeholder="जिला चुनें / Choose District" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border shadow-elevated">
            {jharkhandDistricts.map((district) => (
              <SelectItem 
                key={district} 
                value={district}
                className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}