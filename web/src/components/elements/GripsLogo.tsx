import { Badge } from "@/components/ui/badge"

const GripsLogo = () => {
  return (
    <div className="flex gap-2 py-2 items-center justify-center">
      <div className="text-xl font-medium">
        grips
      </div>
      <Badge>
        beta
      </Badge>
    </div>
  )
}

export default GripsLogo