import { type Student, type InsertStudent } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { StudentForm } from "./student-form";

interface EditStudentDialogProps {
  student: Student | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: InsertStudent) => void;
  isPending?: boolean;
}

export function EditStudentDialog({
  student,
  open,
  onOpenChange,
  onSubmit,
  isPending = false,
}: EditStudentDialogProps) {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Student Information
          </DialogTitle>
          <DialogDescription>
            Update the details for {student.firstName} {student.lastName} ({student.studentId})
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <StudentForm
            onSubmit={onSubmit}
            isPending={isPending}
            defaultValues={student}
            submitLabel="Save Changes"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
