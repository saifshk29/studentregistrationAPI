import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, LayoutGrid, TableIcon, X } from "lucide-react";

const COURSES = [
  "All Courses",
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

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  courseFilter: string;
  onCourseFilterChange: (value: string) => void;
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
}

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  courseFilter,
  onCourseFilterChange,
  viewMode,
  onViewModeChange,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="relative flex-1 w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Search by name, email, or ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-8 h-10"
          data-testid="input-search"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
            data-testid="button-clear-search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2 w-full sm:w-auto">
        <Select value={courseFilter} onValueChange={onCourseFilterChange}>
          <SelectTrigger 
            className="w-full sm:w-[180px] h-10"
            data-testid="select-course-filter"
          >
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            {COURSES.map((course) => (
              <SelectItem 
                key={course} 
                value={course === "All Courses" ? "all" : course}
              >
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex border border-input rounded-md">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => onViewModeChange("grid")}
            className="rounded-r-none border-r"
            data-testid="button-view-grid"
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant={viewMode === "table" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => onViewModeChange("table")}
            className="rounded-l-none"
            data-testid="button-view-table"
          >
            <TableIcon className="h-4 w-4" />
            <span className="sr-only">Table view</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
