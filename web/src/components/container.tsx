import { cn } from "@/lib/utils"
import type { PropsWithChildren } from "react"

type props = PropsWithChildren<{
  className?: string
}>

export const Container = ({className, children}: props) => {
  return (
    <div className={cn('w-dvw', className)}>
      {children}
    </div>
  )
}

export const ContainerContent = ({className, children}: props) => {
  return (
    <div className={cn('container mx-auto px-6', className)}>
      {children}
    </div>
  )
}