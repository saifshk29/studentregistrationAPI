import { type Student } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export function StudentTable({ students, onEdit, onDelete }: StudentTableProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Student</TableHead>
            <TableHead className="font-semibold">Student ID</TableHead>
            <TableHead className="font-semibold">Course</TableHead>
            <TableHead className="font-semibold hidden md:table-cell">Email</TableHead>
            <TableHead className="font-semibold hidden lg:table-cell">Enrollment Date</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => {
            const initials = `${student.firstName[0]}${student.lastName[0]}`.toUpperCase();
            const formattedDate = (() => {
              try {
                return format(parseISO(student.enrollmentDate), "MMM d, yyyy");
              } catch {
                return student.enrollmentDate;
              }
            })();

            return (
              <TableRow 
                key={student.id}
                className="hover:bg-muted/30 transition-colors"
                data-testid={`row-student-${student.id}`}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-primary/10">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p 
                        className="font-medium text-foreground"
                        data-testid={`text-name-${student.id}`}
                      >
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground md:hidden">
                        {student.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span 
                    className="font-mono text-sm text-muted-foreground"
                    data-testid={`text-id-${student.id}`}
                  >
                    {student.studentId}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className="text-xs"
                    data-testid={`badge-course-${student.id}`}
                  >
                    {student.course}
                  </Badge>
                </TableCell>
                <TableCell 
                  className="hidden md:table-cell text-muted-foreground"
                  data-testid={`text-email-${student.id}`}
                >
                  {student.email}
                </TableCell>
                <TableCell 
                  className="hidden lg:table-cell text-muted-foreground"
                  data-testid={`text-date-${student.id}`}
                >
                  {formattedDate}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(student)}
                      data-testid={`button-edit-${student.id}`}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit {student.firstName}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(student)}
                      className="text-destructive hover:text-destructive"
                      data-testid={`button-delete-${student.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete {student.firstName}</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
