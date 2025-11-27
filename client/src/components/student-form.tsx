import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertStudentSchema, type InsertStudent, type Student } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const COURSES = [
  "Computer Science",
  "Information Technology",
  "Data Science",
  "Cybersecurity",
  "Software Engineering",
  "Artificial Intelligence",
  "Web Development",
  "Mobile Development",
  "Cloud Computing",
  "Business Administration",
];

interface StudentFormProps {
  onSubmit: (data: InsertStudent) => void;
  isPending?: boolean;
  defaultValues?: Partial<Student>;
  submitLabel?: string;
}

export function StudentForm({
  onSubmit,
  isPending = false,
  defaultValues,
  submitLabel = "Register Student",
}: StudentFormProps) {
  const form = useForm<InsertStudent>({
    resolver: zodResolver(insertStudentSchema),
    defaultValues: {
      firstName: defaultValues?.firstName || "",
      lastName: defaultValues?.lastName || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      course: defaultValues?.course || "",
      enrollmentDate: defaultValues?.enrollmentDate || new Date().toISOString().split("T")[0],
    },
  });

  const handleSubmit = (data: InsertStudent) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="pb-2 border-b border-border">
            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Personal Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">First Name</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="input-first-name"
                      placeholder="Enter first name"
                      className="h-11"
                      {...field}
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
                  <FormLabel className="text-sm font-medium">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="input-last-name"
                      placeholder="Enter last name"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="pb-2 border-b border-border">
            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Contact Details
            </h3>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Email Address</FormLabel>
                <FormControl>
                  <Input
                    data-testid="input-email"
                    type="email"
                    placeholder="student@example.com"
                    className="h-11"
                    {...field}
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
                <FormLabel className="text-sm font-medium">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    data-testid="input-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="pb-2 border-b border-border">
            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Academic Details
            </h3>
          </div>

          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Course / Major</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-course" className="h-11">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COURSES.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="enrollmentDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Enrollment Date</FormLabel>
                <FormControl>
                  <Input
                    data-testid="input-enrollment-date"
                    type="date"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-4">
          <Button
            data-testid="button-submit"
            type="submit"
            className="w-full sm:w-auto sm:min-w-[12rem]"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
