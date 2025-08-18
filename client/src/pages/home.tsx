import Header from "@/components/header";
import Hero from "@/components/hero";
import CourseCatalog from "@/components/course-catalog";
import Testimonials from "@/components/testimonials";
import Instructors from "@/components/instructors";
import Pricing from "@/components/pricing";
import FAQ from "@/components/faq";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      {/* Course Features Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TalentsHive?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience world-class training with industry-leading curriculum and expert instructors.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="feature-icon bg-gradient-to-r from-primary to-accent">
                <i className="fas fa-chalkboard-teacher text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals with years of real-world experience.</p>
            </div>

            <div className="text-center group">
              <div className="feature-icon bg-gradient-to-r from-secondary to-purple-500">
                <i className="fas fa-hands-helping text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hands-On Learning</h3>
              <p className="text-gray-600">Practice with real projects and industry-standard tools and equipment.</p>
            </div>

            <div className="text-center group">
              <div className="feature-icon bg-gradient-to-r from-accent to-green-500">
                <i className="fas fa-briefcase text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Support</h3>
              <p className="text-gray-600">Get job placement assistance and career counseling after completion.</p>
            </div>

            <div className="text-center group">
              <div className="feature-icon bg-gradient-to-r from-orange-500 to-red-500">
                <i className="fas fa-certificate text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Certification</h3>
              <p className="text-gray-600">Receive recognized certifications that boost your career prospects.</p>
            </div>
          </div>
        </div>
      </section>

      <CourseCatalog />
      <Testimonials />
      <Instructors />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
