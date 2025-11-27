import { type Student } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Pencil, Trash2, Mail, Phone, Calendar, GraduationCap } from "lucide-react";
import { format, parseISO } from "date-fns";

interface StudentCardProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export function StudentCard({ student, onEdit, onDelete }: StudentCardProps) {
  const initials = `${student.firstName[0]}${student.lastName[0]}`.toUpperCase();
  
  const formattedDate = (() => {
    try {
      return format(parseISO(student.enrollmentDate), "MMM d, yyyy");
    } catch {
      return student.enrollmentDate;
    }
  })();

  return (
    <Card 
      className="hover-elevate transition-all duration-200 group"
      data-testid={`card-student-${student.id}`}
    >
      <CardHeader className="flex flex-row items-start gap-4 pb-4">
        <Avatar className="h-12 w-12 border-2 border-primary/10">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 
            className="font-semibold text-lg text-foreground truncate"
            data-testid={`text-student-name-${student.id}`}
          >
            {student.firstName} {student.lastName}
          </h3>
          <p 
            className="text-sm text-muted-foreground font-mono"
            data-testid={`text-student-id-${student.id}`}
          >
            {student.studentId}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <Badge 
            variant="secondary" 
            className="text-xs font-medium"
            data-testid={`badge-course-${student.id}`}
          >
            {student.course}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span 
              className="text-muted-foreground truncate"
              data-testid={`text-email-${student.id}`}
            >
              {student.email}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span 
              className="text-muted-foreground"
              data-testid={`text-phone-${student.id}`}
            >
              {student.phone}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span 
              className="text-muted-foreground"
              data-testid={`text-enrollment-date-${student.id}`}
            >
              Enrolled: {formattedDate}
            </span>
          </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(student)}
          data-testid={`button-edit-${student.id}`}
        >
          <Pencil className="h-4 w-4 mr-1.5" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(student)}
          className="text-destructive hover:text-destructive"
          data-testid={`button-delete-${student.id}`}
        >
          <Trash2 className="h-4 w-4 mr-1.5" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
