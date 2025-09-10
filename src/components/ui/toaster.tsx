"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-slate-900 group-[.toaster]:text-slate-50 group-[.toaster]:border-slate-800 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-slate-400",
          actionButton:
            "group-[.toast]:bg-slate-50 group-[.toast]:text-slate-900",
          cancelButton:
            "group-[.toast]:bg-slate-800 group-[.toast]:text-slate-400",
          success: "group-[.toaster]:bg-emerald-900 group-[.toaster]:text-emerald-100 group-[.toaster]:border-emerald-800",
          error: "group-[.toaster]:bg-red-900 group-[.toaster]:text-red-100 group-[.toaster]:border-red-800",
          warning: "group-[.toaster]:bg-orange-900 group-[.toaster]:text-orange-100 group-[.toaster]:border-orange-800",
          info: "group-[.toaster]:bg-blue-900 group-[.toaster]:text-blue-100 group-[.toaster]:border-blue-800",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }