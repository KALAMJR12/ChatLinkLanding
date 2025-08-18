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
    <section id="courses" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Professional Courses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Choose from our comprehensive range of technology courses designed to launch your career in high-demand fields.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses?.map((course) => (
            <div key={course.id} className="course-card group" data-testid={`course-card-${course.id}`}>
              {/* Course Image */}
              <div className="course-card-image h-48">
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
                <div className="course-card-overlay"></div>
                <div className="absolute top-4 left-4 z-10">
                  {course.isPopular && (
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg" data-testid={`badge-popular-${course.id}`}>
                      🔥 Popular
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <i className={`${getCategoryIcon(course.category)} text-white text-xl`}></i>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs font-medium">
                      {course.level}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{course.maxStudents} spots</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2" data-testid={`text-course-title-${course.id}`}>
                    {course.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-6 line-clamp-3" data-testid={`text-course-description-${course.id}`}>
                  {course.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium" data-testid={`text-course-duration-${course.id}`}>{course.duration}</span>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center mr-3">
                      <Tag className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <span className="font-medium">Certificate Included</span>
                      <div className="text-xs text-gray-500">Industry recognized</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Starting from</div>
                      <div className="course-card-price" data-testid={`price-${course.id}`}>
                        ₦{Number(course.standardPrice).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/course/${course.id}`}>
                        <Button variant="outline" size="sm" data-testid={`button-learn-more-${course.id}`}>
                          Details
                        </Button>
                      </Link>
                      <Link href="/application-form">
                        <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg" size="sm" data-testid={`button-apply-${course.id}`}>
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </div>
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
