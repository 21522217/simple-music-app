"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

type TooltipProviderProps = React.ComponentProps<typeof TooltipPrimitive.Provider>;
export function TooltipProvider({ children, ...props }: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider {...props}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;
export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <TooltipPrimitive.Root {...props}>
      {children}
    </TooltipPrimitive.Root>
  );
}

type TooltipTriggerProps = React.ComponentProps<typeof TooltipPrimitive.Trigger>;
export const TooltipTrigger = TooltipPrimitive.Trigger;

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content>;
export function TooltipContent({ children, ...props }: TooltipContentProps) {
  return (
    <TooltipPrimitive.Content
      sideOffset={4}
      className="z-50 overflow-hidden rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="fill-popover" />
    </TooltipPrimitive.Content>
  );
}
