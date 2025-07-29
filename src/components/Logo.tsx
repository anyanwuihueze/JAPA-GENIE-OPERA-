import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 24"
      width="120"
      height="24"
      {...props}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
        fill="url(#grad1)"
      ></path>
      <path
        d="M12 2C17.5228 2 22 6.47715 22 12"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="10s"
          repeatCount="indefinite"
        />
      </path>
      <text
        x="30"
        y="17"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="hsl(var(--foreground))"
        className="font-headline"
      >
        VisaFlow
      </text>
    </svg>
  );
}
