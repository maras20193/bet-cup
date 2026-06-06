import type { LabelProps } from "recharts"

import { CustomAvatar } from "@/components/shared/CustomAvatar"

type CustomLabelProps = LabelProps & {
  name: string
}

export const CustomLabel = (props: CustomLabelProps) => {
  const { value, name } = props
  const x = Number(props.x ?? 0)
  const y = Number(props.y ?? 0)
  const width = Number(props.width ?? 0)

  return (
    <g>
      <foreignObject x={x + width / 2 - 16} y={y - 38} width={32} height={32}>
        <CustomAvatar seed={name} />
      </foreignObject>

      <text
        x={x + width / 2}
        y={y - 47}
        textAnchor="middle"
        className="fill-foreground font-medium text-lg"
      >
        {value}
      </text>
    </g>
  )
}
// Options for placing avatar and text:
// 38 47 - top text
// 65 10 - top avatar
