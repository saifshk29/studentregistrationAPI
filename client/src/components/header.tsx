import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { GraduationCap, UserPlus, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg hidden sm:inline-block">
              Student Registration
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link href="/" asChild>
              <Button
                variant={location === "/" ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "gap-2",
                  location === "/" && "bg-secondary"
                )}
                data-testid="nav-dashboard"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>
            <Link href="/register" asChild>
              <Button
                variant={location === "/register" ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "gap-2",
                  location === "/register" && "bg-secondary"
                )}
                data-testid="nav-register"
              >
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Register</span>
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
