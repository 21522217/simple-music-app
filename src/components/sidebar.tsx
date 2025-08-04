"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Home, Music, Users } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

import { Button } from "./ui/button";
import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  TooltipProvider,
} from "./ui/tooltip";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/musics", icon: Music, label: "Musics" },
  { href: "/artists", icon: Users, label: "Artists" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [togglePos, setTogglePos] = useState({
    x: 32,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 300,
  });
  const dragRef = useRef<HTMLButtonElement>(null);
  const dragging = useRef(false);

  // Drag logic for movable toggle button
  const onDragStart = (e: React.MouseEvent) => {
    dragging.current = true;
    document.body.style.userSelect = "none";
  };
  const onDrag = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    setTogglePos({
      x: e.clientX - 24,
      y: e.clientY - 24,
    });
  };
  const onDragEnd = () => {
    dragging.current = false;
    document.body.style.userSelect = "";
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-1/2 left-4 -translate-y-1/2 bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-3xl shadow-xl",
          "flex flex-col overflow-hidden transition-all duration-500 ease-in-out",
          open ? "w-20 py-4 px-2 items-center" : "w-0 p-0 pointer-events-none"
        )}
        style={{ zIndex: 50 }}
      >
        {/* Nav Icons */}
        <nav className="flex flex-col items-center gap-4">
          <TooltipProvider>
            {navItems.map(({ href, icon: Icon, label }) => (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="rounded-xl group"
                  >
                    <Link href={href} aria-label={label}>
                      <Icon className="w-7 h-7 text-gray-800 dark:text-gray-200 group-hover:scale-125 transition-all duration-150" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </aside>
    </>
  );
}
