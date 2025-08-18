import { useQuery } from "@tanstack/react-query";
import { type Testimonial } from "@shared/schema";
import { Star } from "lucide-react";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      'bg-gradient-to-r from-primary to-accent',
      'bg-gradient-to-r from-secondary to-purple-500',
      'bg-gradient-to-r from-green-500 to-teal-500'
    ];
    return gradients[index % gradients.length];
  };

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories from Our Alumni</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Hear from professionals who transformed their careers with TalentsHive training.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="testimonial-card animate-pulse">
                <div className="flex space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="h-5 w-5 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="h-20 bg-gray-200 rounded mb-6"></div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
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
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories from Our Alumni</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Hear from professionals who transformed their careers with TalentsHive training.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial, index) => (
            <div key={testimonial.id} className="testimonial-card" data-testid={`testimonial-${testimonial.id}`}>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic" data-testid={`testimonial-content-${testimonial.id}`}>
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className={`w-12 h-12 ${getGradientClass(index)} rounded-full flex items-center justify-center mr-4`}>
                  <span className="text-white font-semibold" data-testid={`testimonial-initials-${testimonial.id}`}>
                    {getInitials(testimonial.studentName)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900" data-testid={`testimonial-name-${testimonial.id}`}>
                    {testimonial.studentName}
                  </div>
                  <div className="text-sm text-gray-600" data-testid={`testimonial-title-${testimonial.id}`}>
                    {testimonial.studentTitle}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
