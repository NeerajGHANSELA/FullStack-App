"use client"

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";


const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'text-white border-none !bg-[#010B13]',
          title: 'text-md font-semibold',
        },
      }}
      {...props} 
    />
  );
}

export { Toaster }
