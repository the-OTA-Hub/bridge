export const Logo = ({
  size = 24,
  strokeWidth = 2,
  color = "currentColor",
  className = "",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Upper semicircle centered at (12,12) with radius 9 */}
    <path d="M3 12a9 9 0 0 1 18 0" />
  </svg>
);
