import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/header";
import Footer from "@/components/footer";

const applicationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  course: z.string().min(1, "Please select a course"),
  plan: z.string().min(1, "Please select a plan"),
  startDate: z.string().min(1, "Please select a start date"),
  experience: z.string().min(1, "Please select your experience level"),
  motivation: z.string().min(50, "Please provide at least 50 characters describing your motivation"),
  previousEducation: z.string().min(10, "Please provide your educational background"),
  workExperience: z.string().optional(),
  expectations: z.string().min(30, "Please describe what you expect from this course"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      course: "",
      plan: "",
      startDate: "",
      experience: "",
      motivation: "",
      previousEducation: "",
      workExperience: "",
      expectations: "",
    },
  });

  const submitApplication = useMutation({
    mutationFn: (data: ApplicationFormData) => 
      fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(res => res.json()),
    onSuccess: () => {
      toast({
        title: "Application Submitted Successfully!",
        description: "Thank you for your application. We'll contact you within 48 hours to discuss your enrollment.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
    },
    onError: (error) => {
      console.error("Application submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again or contact us directly.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    submitApplication.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <Header />
      
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Apply Now for <span className="talents-gradient">TalentsHive</span> Training
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take the first step towards launching your tech career. Fill out this comprehensive application form and we'll guide you through the enrollment process.
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold text-center">Course Application Form</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your first name" 
                                {...field} 
                                data-testid="input-first-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your last name" 
                                {...field} 
                                data-testid="input-last-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="your.email@example.com" 
                                {...field} 
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="+234 XXX XXX XXXX" 
                                {...field} 
                                data-testid="input-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Course Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Course Selection
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="course"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Course *</FormLabel>
                            <FormControl>
                              <Select 
                                onValueChange={field.onChange} 
                                value={field.value}
                                data-testid="select-course"
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose a course" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cybersecurity">Cybersecurity Analyst</SelectItem>
                                  <SelectItem value="web-development">Web Development</SelectItem>
                                  <SelectItem value="networking">Network Infrastructure</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="plan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Training Plan *</FormLabel>
                            <FormControl>
                              <Select 
                                onValueChange={field.onChange} 
                                value={field.value}
                                data-testid="select-plan"
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose a plan" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="standard">Standard - ₦200,000</SelectItem>
                                  <SelectItem value="professional">Professional - ₦300,000</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Start Date *</FormLabel>
                            <FormControl>
                              <Select 
                                onValueChange={field.onChange} 
                                value={field.value}
                                data-testid="select-start-date"
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select start date" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="2025-01-15">January 15, 2025</SelectItem>
                                  <SelectItem value="2025-02-15">February 15, 2025</SelectItem>
                                  <SelectItem value="2025-03-15">March 15, 2025</SelectItem>
                                  <SelectItem value="2025-04-15">April 15, 2025</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Experience and Background */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Background Information
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technical Experience Level *</FormLabel>
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange} 
                              value={field.value}
                              data-testid="select-experience"
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select your experience level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beginner">Beginner - No prior experience</SelectItem>
                                <SelectItem value="some">Some Experience - Basic knowledge</SelectItem>
                                <SelectItem value="intermediate">Intermediate - Some projects/courses</SelectItem>
                                <SelectItem value="advanced">Advanced - Professional experience</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="previousEducation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Educational Background *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please describe your educational background (e.g., degree, field of study, certifications)..."
                              className="min-h-[100px]"
                              {...field}
                              data-testid="textarea-education"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="workExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work Experience (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe any relevant work experience or projects..."
                              className="min-h-[80px]"
                              {...field}
                              data-testid="textarea-work-experience"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Motivation and Goals */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      Motivation and Goals
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Why do you want to take this course? *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us what motivates you to learn this skill and how it fits into your career goals..."
                              className="min-h-[120px]"
                              {...field}
                              data-testid="textarea-motivation"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="expectations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What do you hope to achieve from this course? *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your learning objectives and career expectations after completing the course..."
                              className="min-h-[100px]"
                              {...field}
                              data-testid="textarea-expectations"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-200"
                      data-testid="button-submit-application"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane mr-2"></i>
                          Submit Application
                        </>
                      )}
                    </Button>
                    <p className="text-sm text-gray-500 text-center mt-3">
                      By submitting this form, you agree to be contacted by TalentsHive regarding your application.
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}