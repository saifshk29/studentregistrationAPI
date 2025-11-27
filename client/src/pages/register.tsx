import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { type InsertStudent } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentForm } from "@/components/student-form";
import { GraduationCap, BookOpen, Users, Award, CheckCircle } from "lucide-react";

const BENEFITS = [
  {
    icon: BookOpen,
    title: "Access to Resources",
    description: "Get instant access to course materials, digital library, and learning resources",
  },
  {
    icon: Users,
    title: "Connect with Peers",
    description: "Join a community of learners and collaborate on projects",
  },
  {
    icon: Award,
    title: "Track Your Progress",
    description: "Monitor your academic journey with detailed progress tracking",
  },
];

export default function Register() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const createMutation = useMutation({
    mutationFn: async (data: InsertStudent) => {
      const response = await apiRequest("POST", "/api/students", data);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      toast({
        title: "Registration Successful",
        description: `Welcome! Student ID: ${data.studentId} has been assigned.`,
      });
      setTimeout(() => {
        setLocation("/");
      }, 1500);
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register student. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertStudent) => {
    createMutation.mutate(data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="order-2 lg:order-1">
          <Card className="shadow-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl font-semibold">
                  Student Registration
                </CardTitle>
              </div>
              <CardDescription className="text-base">
                Fill in the details below to register a new student. All fields marked are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StudentForm
                onSubmit={handleSubmit}
                isPending={createMutation.isPending}
                submitLabel="Complete Registration"
              />
            </CardContent>
          </Card>
        </div>

        <div className="order-1 lg:order-2 lg:sticky lg:top-24">
          <div className="rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-6 md:p-8 border border-primary/10">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Join Our Academic Community
              </h2>
              <p className="text-muted-foreground">
                Start your educational journey with us. Registration takes just a few minutes.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {BENEFITS.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex gap-4 p-4 rounded-lg bg-background/80 border border-border"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-chart-2/10 border border-chart-2/20">
              <CheckCircle className="h-5 w-5 text-chart-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Quick Registration
                </p>
                <p className="text-sm text-muted-foreground">
                  Your student ID will be generated automatically upon successful registration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
