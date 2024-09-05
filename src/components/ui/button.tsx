// @ts-ignore
export function Button ({ children, onClick, variant, size }) {
  const baseStyles = "px-4 py-2 rounded-md font-semibold focus:outline-none"
  const variantStyles = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-gray-200 text-gray-800",
    outline: "border border-gray-200 text-gray-800",
  }
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }
  return (
    <button
      onClick={onClick}
    //   @ts-ignore
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} flex gap-2 items-center`} 
    >
      {children}
    </button>
  )
}