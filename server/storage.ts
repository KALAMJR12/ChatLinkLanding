import { 
  type Course, 
  type InsertCourse, 
  type Instructor, 
  type InsertInstructor,
  type Testimonial, 
  type InsertTestimonial,
  type Application, 
  type InsertApplication,
  type ContactMessage, 
  type InsertContactMessage 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Course methods
  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;

  // Instructor methods
  getInstructors(): Promise<Instructor[]>;
  getInstructor(id: string): Promise<Instructor | undefined>;
  createInstructor(instructor: InsertInstructor): Promise<Instructor>;

  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonialsByCourse(courseId: string): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Application methods
  getApplications(): Promise<Application[]>;
  getApplication(id: string): Promise<Application | undefined>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplicationStatus(id: string, status: string): Promise<Application | undefined>;

  // Contact message methods
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: string): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private courses: Map<string, Course>;
  private instructors: Map<string, Instructor>;
  private testimonials: Map<string, Testimonial>;
  private applications: Map<string, Application>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.courses = new Map();
    this.instructors = new Map();
    this.testimonials = new Map();
    this.applications = new Map();
    this.contactMessages = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample courses
    const cybersecurityCourse: Course = {
      id: "cyber-001",
      title: "Cybersecurity Junior Analyst",
      description: "Master cybersecurity fundamentals, threat detection, and incident response. Protect organizations from evolving cyber threats.",
      duration: "6 weeks intensive training",
      level: "Beginner to Intermediate",
      category: "cybersecurity",
      standardPrice: "200000",
      professionalPrice: "300000",
      curriculum: [
        "Introduction to Cybersecurity",
        "Threat Detection and Analysis",
        "Incident Response",
        "Security Tools and Technologies",
        "Risk Assessment",
        "Compliance and Regulations"
      ],
      prerequisites: ["Basic computer skills", "Familiarity with networking concepts"],
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      isPopular: true,
      maxStudents: 15,
      createdAt: new Date(),
    };

    const webdevCourse: Course = {
      id: "webdev-001",
      title: "Full-Stack Web Development",
      description: "Build modern web applications with React, Node.js, and databases. From frontend to backend development mastery.",
      duration: "8 weeks intensive training",
      level: "Beginner to Advanced",
      category: "webdevelopment",
      standardPrice: "200000",
      professionalPrice: "250000",
      curriculum: [
        "HTML, CSS & JavaScript Fundamentals",
        "React.js Development",
        "Node.js & Express.js",
        "Database Design and Management",
        "API Development",
        "Deployment and DevOps"
      ],
      prerequisites: ["Basic computer skills", "Logical thinking ability"],
      imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      isPopular: false,
      maxStudents: 15,
      createdAt: new Date(),
    };

    const networkingCourse: Course = {
      id: "network-001",
      title: "Network Infrastructure",
      description: "Configure and manage enterprise networks, routers, switches, and security protocols. CCNA preparation included.",
      duration: "6 weeks hands-on training",
      level: "Intermediate",
      category: "networking",
      standardPrice: "200000",
      professionalPrice: "280000",
      curriculum: [
        "Networking Fundamentals",
        "Router and Switch Configuration",
        "Network Security",
        "VLAN and Subnetting",
        "Network Troubleshooting",
        "CCNA Exam Preparation"
      ],
      prerequisites: ["Basic IT knowledge", "Understanding of computer systems"],
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      isPopular: false,
      maxStudents: 15,
      createdAt: new Date(),
    };

    this.courses.set(cybersecurityCourse.id, cybersecurityCourse);
    this.courses.set(webdevCourse.id, webdevCourse);
    this.courses.set(networkingCourse.id, networkingCourse);

    // Sample instructors
    const victorMomoh: Instructor = {
      id: "instructor-001",
      name: "Victor Momoh",
      title: "Lead Cybersecurity Instructor",
      bio: "AZ-900 & AZ-104 certified cloud security expert with 8+ years experience in enterprise cybersecurity and threat analysis.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      expertise: ["Cybersecurity", "Cloud Security", "Threat Analysis", "Penetration Testing"],
      experience: "8+ years",
      certifications: ["AZ-900", "AZ-104", "CISSP", "CEH"],
      studentsCount: 500,
      rating: "4.9",
    };

    const sarahAdebayo: Instructor = {
      id: "instructor-002",
      name: "Sarah Adebayo",
      title: "Senior Full-Stack Instructor",
      bio: "Former Google software engineer with expertise in React, Node.js, and modern web technologies. 6+ years teaching experience.",
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b977?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      expertise: ["React.js", "Node.js", "JavaScript", "Full-Stack Development"],
      experience: "6+ years",
      certifications: ["AWS Solutions Architect", "Google Cloud Professional", "MongoDB Certified"],
      studentsCount: 750,
      rating: "4.8",
    };

    const emekaOkafor: Instructor = {
      id: "instructor-003",
      name: "Emeka Okafor",
      title: "Network Infrastructure Expert",
      bio: "CCNP certified network engineer with 10+ years at Cisco. Specializes in enterprise network design and security.",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      expertise: ["Networking", "Cisco Technologies", "Network Security", "Enterprise Infrastructure"],
      experience: "10+ years",
      certifications: ["CCNP", "CCNA Security", "Cisco DevNet Professional"],
      studentsCount: 400,
      rating: "4.9",
    };

    this.instructors.set(victorMomoh.id, victorMomoh);
    this.instructors.set(sarahAdebayo.id, sarahAdebayo);
    this.instructors.set(emekaOkafor.id, emekaOkafor);

    // Sample testimonials
    const testimonial1: Testimonial = {
      id: "testimonial-001",
      studentName: "Adebayo Olumide",
      studentTitle: "Cybersecurity Analyst, First Bank",
      content: "The cybersecurity course transformed my career. I went from having no IT background to landing a security analyst role at a major bank within 3 months of graduating.",
      courseId: "cyber-001",
      rating: 5,
      createdAt: new Date(),
    };

    const testimonial2: Testimonial = {
      id: "testimonial-002",
      studentName: "Folake Nwosu",
      studentTitle: "Founder, TechSolutions Nigeria",
      content: "The web development program gave me the skills I needed to start my own tech company. The instructors were incredibly supportive and the curriculum was very current.",
      courseId: "webdev-001",
      rating: 5,
      createdAt: new Date(),
    };

    const testimonial3: Testimonial = {
      id: "testimonial-003",
      studentName: "Chinedu Aba",
      studentTitle: "Network Engineer, MTN Nigeria",
      content: "The networking course prepared me for my CCNA certification. The hands-on lab sessions with real equipment made all the difference in my understanding.",
      courseId: "network-001",
      rating: 5,
      createdAt: new Date(),
    };

    this.testimonials.set(testimonial1.id, testimonial1);
    this.testimonials.set(testimonial2.id, testimonial2);
    this.testimonials.set(testimonial3.id, testimonial3);
  }

  // Course methods
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = {
      ...insertCourse,
      id,
      createdAt: new Date(),
    };
    this.courses.set(id, course);
    return course;
  }

  // Instructor methods
  async getInstructors(): Promise<Instructor[]> {
    return Array.from(this.instructors.values());
  }

  async getInstructor(id: string): Promise<Instructor | undefined> {
    return this.instructors.get(id);
  }

  async createInstructor(insertInstructor: InsertInstructor): Promise<Instructor> {
    const id = randomUUID();
    const instructor: Instructor = { ...insertInstructor, id };
    this.instructors.set(id, instructor);
    return instructor;
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonialsByCourse(courseId: string): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(
      testimonial => testimonial.courseId === courseId
    );
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = {
      ...insertTestimonial,
      id,
      createdAt: new Date(),
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Application methods
  async getApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
  }

  async getApplication(id: string): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = randomUUID();
    const application: Application = {
      ...insertApplication,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.applications.set(id, application);
    return application;
  }

  async updateApplicationStatus(id: string, status: string): Promise<Application | undefined> {
    const application = this.applications.get(id);
    if (application) {
      application.status = status;
      this.applications.set(id, application);
    }
    return application;
  }

  // Contact message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      status: "new",
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
