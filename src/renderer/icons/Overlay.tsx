import { IconProps } from './types'

export const IconOverlay: React.VFC<IconProps> = ({ className, onClick }) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      onClick={onClick}
    >
      <rect
        x={4.75}
        y={4.75}
        width={14.5}
        height={14.5}
        rx={1.25}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path
        d="M7 17L17 7M11 17l6-6M7 13l6-6M15.5 17l1.5-1.5M7 8.5L8.5 7"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  )
}

export default IconOverlay
