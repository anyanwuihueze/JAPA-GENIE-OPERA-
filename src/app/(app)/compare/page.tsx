import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

const visaData = [
  {
    country: "United States",
    name: "H-1B Visa",
    description: "For specialty occupations requiring a bachelor's degree or higher.",
    processingTime: "4-12 months",
    cost: "$4,000 - $11,000",
    eligibility: [
      "Bachelor's degree or equivalent",
      "Job offer in a specialty occupation",
      "Employer sponsorship",
      "Lottery selection",
    ],
    tags: ["Work", "Tech", "High-Skilled"],
  },
  {
    country: "United Kingdom",
    name: "Skilled Worker Visa",
    description: "For individuals with a job offer from a licensed sponsor.",
    processingTime: "3-8 weeks",
    cost: "£1,500 - £3,500",
    eligibility: [
      "Certificate of Sponsorship from an employer",
      "Job at an appropriate skill level",
      "Meet minimum salary requirements",
      "English language proficiency (B1)",
    ],
    tags: ["Work", "Long-term"],
  },
  {
    country: "Canada",
    name: "Express Entry",
    description: "A points-based system for skilled immigrants and their families.",
    processingTime: "6-9 months",
    cost: "$2,300 - $4,500 CAD",
    eligibility: [
      "Comprehensive Ranking System (CRS) score",
      "Skilled work experience (NOC 0, 1, 2, or 3)",
      "Language proficiency (English/French)",
      "Educational Credential Assessment (ECA)",
    ],
    tags: ["PR", "Points-based", "Skilled"],
  },
];

export default function ComparePage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b bg-card p-4 md:p-6">
        <h1 className="font-headline text-2xl font-bold tracking-tight">Visa Comparison</h1>
        <p className="text-muted-foreground">
          Compare different visa options side-by-side to find your best fit.
        </p>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visaData.map((visa) => (
            <Card key={visa.name} className="flex flex-col shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardDescription>{visa.country}</CardDescription>
                    <CardTitle className="font-headline">{visa.name}</CardTitle>
                  </div>
                  <Badge variant="secondary">{visa.tags[0]}</Badge>
                </div>
                <p className="pt-2 text-sm text-muted-foreground">{visa.description}</p>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Key Metrics</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Processing Time:</strong> {visa.processingTime}</p>
                    <p><strong>Estimated Cost:</strong> {visa.cost}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Eligibility Criteria</h4>
                  <ul className="space-y-2">
                    {visa.eligibility.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-green-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                {visa.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
