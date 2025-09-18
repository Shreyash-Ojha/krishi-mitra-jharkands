import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages, Globe } from "lucide-react";

const languages = [
  { code: "hi", name: "हिंदी", english: "Hindi" },
  { code: "en", name: "English", english: "English" },
  { code: "ur", name: "اردو", english: "Urdu" },
  { code: "bn", name: "বাংলা", english: "Bengali" },
  { code: "or", name: "ଓଡ଼ିଆ", english: "Odia" },
];

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("hi");

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    // In a real implementation, this would integrate with Google Translate API
    console.log(`Language changed to: ${languageCode}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-primary" />
      <Select onValueChange={handleLanguageChange} value={selectedLanguage}>
        <SelectTrigger className="w-32 bg-background border-border text-foreground shadow-soft">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-card border-border shadow-elevated">
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code}
              className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}