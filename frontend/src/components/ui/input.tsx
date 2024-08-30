import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  tag?: string;
  comment?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor={props.tag}>
          {props.label}{" "}
          <span className="text-xs text-muted-foreground">
            {props.comment && `(${props.comment})`}
          </span>
        </Label>
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          id={props.tag}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
