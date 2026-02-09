interface CurrencyDisplayProps {
  amount?: number;
  value?: number;
  className?: string;
  showIcon?: boolean;
  iconSize?: number;
}

export function CurrencyDisplay({ 
  amount, 
  value, 
  className = "", 
  showIcon = true, 
  iconSize = 18 
}: CurrencyDisplayProps) {
  const displayValue = value ?? amount ?? 0;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {displayValue.toFixed(2)}
      {showIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-saudi-riyal"
          aria-hidden="true"
        >
          <path d="m20 19.5-5.5 1.2" />
          <path d="M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2" />
          <path d="m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2" />
          <path d="M20 10 4 13.5" />
        </svg>
      )}
    </span>
  );
}
