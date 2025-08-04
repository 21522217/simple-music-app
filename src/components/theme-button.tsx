'use client'

import { useContext } from "react"
import { ThemeContext } from "@/providers/theme"

export default function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <button
      aria-label="toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="transition-colors duration-500 rounded-full bg-muted/70 dark:bg-muted/50 text-2xl w-10 h-10 flex items-center justify-center border hover:bg-primary/90 hover:text-primary-foreground"
      style={{ boxShadow: "0 2px 12px 0 rgba(0,0,0,.10)" }}
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  )
}