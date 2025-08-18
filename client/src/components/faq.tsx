import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What are the prerequisites for enrolling in courses?",
    answer: "Most courses require basic computer skills and familiarity with common software. For specialized courses like cybersecurity, some IT background is helpful but not mandatory. We provide pre-course materials to help you prepare."
  },
  {
    id: "2", 
    question: "Do you provide job placement assistance?",
    answer: "Yes, we offer comprehensive career support including resume review, interview preparation, and connections with our industry partners. Our job placement rate is over 85% within 6 months of graduation."
  },
  {
    id: "3",
    question: "Are the certifications industry-recognized?",
    answer: "Absolutely! Our certifications are recognized by major industry bodies and employers. We also prepare students for third-party certifications like CCNA, CompTIA Security+, and AWS certifications."
  },
  {
    id: "4",
    question: "Can I switch between online and classroom formats?",
    answer: "Professional plan students can attend both formats. Standard plan students can upgrade to Professional at any time during the course by paying the difference."
  },
  {
    id: "5",
    question: "What payment options are available?",
    answer: "We accept bank transfers, card payments, and installment plans. Payment must be completed 2 weeks before course start date. Contact us to discuss flexible payment options."
  }
];

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Get answers to common questions about our training programs.</p>
        </div>

        <div className="space-y-6">
          {faqData.map((faq) => (
            <Card key={faq.id} className="faq-item" data-testid={`faq-item-${faq.id}`}>
              <button 
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none"
                onClick={() => toggleFAQ(faq.id)}
                data-testid={`faq-button-${faq.id}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4" data-testid={`faq-question-${faq.id}`}>
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={cn(
                      "h-5 w-5 text-gray-400 transform transition-transform duration-200 flex-shrink-0",
                      openFAQ === faq.id && "rotate-180"
                    )}
                  />
                </div>
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 pb-6" data-testid={`faq-answer-${faq.id}`}>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
