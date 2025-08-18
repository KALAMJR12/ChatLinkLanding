import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { type Course } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Tag } from "lucide-react";

export default function CourseCatalog() {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cybersecurity':
        return 'fas fa-shield-alt';
      case 'webdevelopment':
        return 'fas fa-code';
      case 'networking':
        return 'fas fa-network-wired';
      default:
        return 'fas fa-laptop';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cybersecurity':
        return 'text-red-500';
      case 'webdevelopment':
        return 'text-blue-500';
      case 'networking':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Professional Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose from our comprehensive range of technology courses designed to launch your career in high-demand fields.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="course-card animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                  <div className="space-y-3 mb-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Professional Courses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose from our comprehensive range of technology courses designed to launch your career in high-demand fields.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses?.map((course) => (
            <div key={course.id} className="course-card" data-testid={`course-card-${course.id}`}>
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                {course.imageUrl ? (
                  <img 
                    src={course.imageUrl} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    data-testid={`img-course-${course.id}`}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <i className={`${getCategoryIcon(course.category)} text-white text-6xl`}></i>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  {course.isPopular && (
                    <Badge className="bg-red-500 text-white" data-testid={`badge-popular-${course.id}`}>
                      Popular
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900" data-testid={`text-course-title-${course.id}`}>
                    {course.title}
                  </h3>
                  <i className={`${getCategoryIcon(course.category)} ${getCategoryColor(course.category)} text-xl`}></i>
                </div>
                
                <p className="text-gray-600 mb-4" data-testid={`text-course-description-${course.id}`}>
                  {course.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    <span data-testid={`text-course-duration-${course.id}`}>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 text-primary mr-2" />
                    <span>Small class sizes (max {course.maxStudents})</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Tag className="h-4 w-4 text-primary mr-2" />
                    <span>Industry certification included</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900" data-testid={`price-${course.id}`}>
                      ₦{Number(course.professionalPrice).toLocaleString()}
                    </span>
                    <span className="text-gray-600 ml-2">Professional</span>
                  </div>
                  <Link href={`/course/${course.id}`}>
                    <Button className="bg-primary hover:bg-primary/90 text-white" data-testid={`button-learn-more-${course.id}`}>
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="btn-secondary"
            data-testid="button-view-all-courses"
          >
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
