import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { HelpCircle } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      question: "What if I need more revisions?",
      answer: "No problem! Each additional revision is $15. We want you to be completely satisfied with your video."
    },
    {
      question: "Which bundle should I choose?",
      answer: "The Video Bundle offers the best value with professional quality learning content and flexible delivery timeline."
    },
    {
      question: "How many languages are available?",
      answer: "Currently supporting lessons in English and Spanish by default. Custom requests can be placed."
    },
    {
      question: "What languages do you support?",
      answer: "We can create videos in multiple languages. Each additional language translation costs $100."
    }
  ];

  return (
    <section id="faq-section" className="py-16 px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Get answers to common questions about our services</p>
        </div>

        <Card className="border-border bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Common Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border last:border-0 pb-6 last:pb-0">
                <h3 className="font-semibold mb-2 flex items-start gap-2">
                  <span className="text-primary mt-1">Q:</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-muted-foreground pl-6">
                  <span className="text-primary font-semibold">A:</span> {faq.answer}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Still have questions? Contact our support team for more information.
          </p>
        </div>
      </div>
    </section>
  );
}