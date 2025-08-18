import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export default function Pricing() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const standardFeatures = [
    "Virtual online classes",
    "Digital course materials (PDF)",
    "Digital certificate",
    "Templates and resources",
    "6 weeks intensive training"
  ];

  const professionalFeatures = [
    "Classroom & virtual options",
    "Print & digital materials",
    "Print certificate",
    "Refreshments (lunch & tea)",
    "Course souvenirs",
    "Personal mentorship"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Learning Path</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Flexible pricing options designed to fit your budget and learning preferences.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Plan */}
          <Card className="border-2 border-gray-100 p-8 relative" data-testid="card-standard-plan">
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2" data-testid="price-standard">₦200,000</div>
                <p className="text-gray-600">Virtual Online Training</p>
              </div>

              <ul className="space-y-4 mb-8">
                {standardFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center" data-testid={`standard-feature-${index}`}>
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full btn-primary"
                onClick={() => scrollToSection('contact')}
                data-testid="button-choose-standard"
              >
                Choose Standard
              </Button>
            </CardContent>
          </Card>

          {/* Professional Plan */}
          <Card className="border-2 border-primary p-8 relative transform scale-105 shadow-2xl" data-testid="card-professional-plan">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-primary text-white px-4 py-2 text-sm font-semibold">
                Most Popular
              </Badge>
            </div>
            
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2" data-testid="price-professional">₦300,000</div>
                <p className="text-gray-600">Classroom & Virtual Training</p>
              </div>

              <ul className="space-y-4 mb-8">
                {professionalFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center" data-testid={`professional-feature-${index}`}>
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full btn-primary"
                onClick={() => scrollToSection('contact')}
                data-testid="button-choose-professional"
              >
                Choose Professional
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
