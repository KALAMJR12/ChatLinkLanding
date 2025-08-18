import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, GraduationCap } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { label: "Courses", href: "#courses" },
    { label: "About", href: "#about" },
    { label: "Success Stories", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <GraduationCap className="text-white h-6 w-6" />
            </div>
            <span className="text-2xl font-bold talents-gradient">TalentsHive</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href.replace('#', ''))}
                className="text-gray-600 hover:text-primary transition-colors duration-200"
                data-testid={`nav-${item.label.toLowerCase().replace(' ', '')}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white"
              data-testid="button-login"
            >
              Login
            </Button>
            <Button 
              className="btn-primary"
              onClick={() => scrollToSection('contact')}
              data-testid="button-enroll"
            >
              Enroll Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-6 mt-8">
                  <Link href="/" className="flex items-center space-x-2 mb-8">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                      <GraduationCap className="text-white h-6 w-6" />
                    </div>
                    <span className="text-xl font-bold talents-gradient">TalentsHive</span>
                  </Link>
                  
                  <nav className="flex flex-col space-y-6">
                    {navItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => scrollToSection(item.href.replace('#', ''))}
                        className="text-gray-600 hover:text-primary transition-colors duration-200 text-left"
                        data-testid={`mobile-nav-${item.label.toLowerCase().replace(' ', '')}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                  
                  <div className="flex flex-col space-y-4 pt-6 border-t">
                    <Button 
                      variant="outline" 
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                      data-testid="mobile-button-login"
                    >
                      Login
                    </Button>
                    <Button 
                      className="w-full btn-primary"
                      onClick={() => scrollToSection('contact')}
                      data-testid="mobile-button-enroll"
                    >
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
