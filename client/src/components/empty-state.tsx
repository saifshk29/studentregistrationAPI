import { Button } from "@/components/ui/button";
import { GraduationCap, UserPlus } from "lucide-react";
import { Link } from "wouter";

interface EmptyStateProps {
  hasSearchQuery?: boolean;
}

export function EmptyState({ hasSearchQuery = false }: EmptyStateProps) {
  if (hasSearchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
          <GraduationCap className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No students found
        </h3>
        <p className="text-muted-foreground max-w-sm mb-6">
          We couldn't find any students matching your search criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
        <GraduationCap className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No students registered yet
      </h3>
      <p className="text-muted-foreground max-w-sm mb-8">
        Get started by registering your first student. All student records will appear here for easy management.
      </p>
      <Link href="/register" asChild>
        <Button data-testid="button-register-first">
          <UserPlus className="mr-2 h-4 w-4" />
          Register First Student
        </Button>
      </Link>
    </div>
  );
}
