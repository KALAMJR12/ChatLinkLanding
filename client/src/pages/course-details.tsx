import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Course } from "@shared/schema";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, Tag, ArrowLeft, Download } from "lucide-react";

export default function CourseDetails() {
  const { id } = useParams();
  
  const { data: course, isLoading } = useQuery<Course>({
    queryKey: ['/api/courses', id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-gray-200 rounded-2xl mb-8"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-8">The course you're looking for doesn't exist.</p>
          <Link href="/">
            <Button data-testid="button-home">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb and Back Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#courses" className="hover:text-primary transition-colors">
              Courses
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium" data-testid="text-coursename">{course.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                {course.isPopular && (
                  <Badge className="bg-red-500 text-white mr-3" data-testid="badge-popular">
                    Popular
                  </Badge>
                )}
                <Badge variant="outline" className="capitalize" data-testid="badge-category">
                  {course.category}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-coursetitle">
                {course.title}
              </h1>
              <p className="text-xl text-gray-600 mb-6" data-testid="text-coursedescription">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center" data-testid="info-duration">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center" data-testid="info-students">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  <span>Max {course.maxStudents} students</span>
                </div>
                <div className="flex items-center" data-testid="info-certification">
                  <Tag className="h-5 w-5 text-primary mr-2" />
                  <span>Industry certification included</span>
                </div>
              </div>
            </div>

            {/* Course Image */}
            {course.imageUrl && (
              <div className="mb-8">
                <img 
                  src={course.imageUrl} 
                  alt={course.title}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                  data-testid="img-course"
                />
              </div>
            )}

            {/* Course Details */}
            <div className="space-y-8">
              {/* Overview */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h3>
                  <p className="text-gray-600 mb-4" data-testid="text-courseoverview">
                    {course.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-900">Duration:</span>
                      <span className="ml-2 text-gray-600" data-testid="text-duration">{course.duration}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Level:</span>
                      <span className="ml-2 text-gray-600" data-testid="text-level">{course.level}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Curriculum */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Curriculum</h3>
                  <div className="space-y-3">
                    {course.curriculum.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                        data-testid={`curriculum-item-${index}`}
                      >
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm mr-4">
                          {index + 1}
                        </div>
                        <span className="text-gray-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Prerequisites */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Prerequisites</h3>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prereq, index) => (
                      <li 
                        key={index} 
                        className="flex items-center text-gray-600"
                        data-testid={`prerequisite-${index}`}
                      >
                        <i className="fas fa-check text-primary mr-3"></i>
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-600 mb-2">Apply Before</div>
                  <div className="text-lg font-semibold text-gray-900 mb-4">June 20, 2025</div>
                  <div className="text-sm text-gray-600 mb-2">Next Start Date</div>
                  <div className="text-lg font-semibold text-primary">June 27, 2025</div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Standard Plan</span>
                    <span className="text-2xl font-bold text-gray-900" data-testid="price-standard">
                      ₦{Number(course.standardPrice).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Professional Plan</span>
                    <span className="text-2xl font-bold text-gray-900" data-testid="price-professional">
                      ₦{Number(course.professionalPrice).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full btn-primary" data-testid="button-apply">
                    Apply Now
                  </Button>
                  <Button variant="outline" className="w-full" data-testid="button-brochure">
                    <Download className="mr-2 h-4 w-4" />
                    Download Brochure
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="text-center text-sm text-gray-600">
                    <p className="mb-2">Need help choosing?</p>
                    <Button variant="link" className="p-0 h-auto text-primary" data-testid="button-advisor">
                      Talk to a Career Advisor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Course Stats</h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="text-gray-900 font-medium">Classroom & Virtual</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="text-gray-900 font-medium" data-testid="stat-duration">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Students</span>
                    <span className="text-gray-900 font-medium" data-testid="stat-maxstudents">{course.maxStudents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Enrolled Students</span>
                    <span className="text-gray-900 font-medium">9,999+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
