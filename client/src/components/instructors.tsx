import { useQuery } from "@tanstack/react-query";
import { type Instructor } from "@shared/schema";
import { GraduationCap, Star } from "lucide-react";

export default function Instructors() {
  const { data: instructors, isLoading } = useQuery<Instructor[]>({
    queryKey: ['/api/instructors'],
  });

  const getGradientClass = (index: number) => {
    const gradients = [
      'bg-gradient-to-r from-red-100 to-pink-100',
      'bg-gradient-to-r from-blue-100 to-purple-100',
      'bg-gradient-to-r from-green-100 to-teal-100'
    ];
    return gradients[index % gradients.length];
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Instructors</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Learn from industry professionals with extensive real-world experience and proven teaching expertise.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="instructor-card animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3 w-2/3"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="flex items-center space-x-4">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
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
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Instructors</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Learn from industry professionals with extensive real-world experience and proven teaching expertise.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors?.map((instructor, index) => (
            <div key={instructor.id} className="instructor-card" data-testid={`instructor-${instructor.id}`}>
              {/* Instructor Photo */}
              <div className={`h-64 ${getGradientClass(index)} relative overflow-hidden`}>
                {instructor.imageUrl ? (
                  <img 
                    src={instructor.imageUrl} 
                    alt={instructor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    data-testid={`img-instructor-${instructor.id}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <GraduationCap className="h-20 w-20" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2" data-testid={`text-instructor-name-${instructor.id}`}>
                  {instructor.name}
                </h3>
                <p className="text-primary font-semibold mb-3" data-testid={`text-instructor-title-${instructor.id}`}>
                  {instructor.title}
                </p>
                <p className="text-gray-600 mb-4" data-testid={`text-instructor-bio-${instructor.id}`}>
                  {instructor.bio}
                </p>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="h-4 w-4 text-primary mr-2" />
                    <span data-testid={`text-instructor-students-${instructor.id}`}>
                      {instructor.studentsCount}+ Students
                    </span>
                  </span>
                  <span className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 mr-2 fill-current" />
                    <span data-testid={`text-instructor-rating-${instructor.id}`}>
                      {instructor.rating} Rating
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
