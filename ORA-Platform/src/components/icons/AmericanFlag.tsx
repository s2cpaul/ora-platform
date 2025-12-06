export function AmericanFlag({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Red Stripes */}
      <rect x="2" y="3" width="20" height="1.5" fill="#B22234" />
      <rect x="2" y="6" width="20" height="1.5" fill="#B22234" />
      <rect x="2" y="9" width="20" height="1.5" fill="#B22234" />
      <rect x="2" y="12" width="20" height="1.5" fill="#B22234" />
      <rect x="2" y="15" width="20" height="1.5" fill="#B22234" />
      <rect x="2" y="18" width="20" height="1.5" fill="#B22234" />
      <rect x="2" y="21" width="20" height="1.5" fill="#B22234" />
      
      {/* White Stripes */}
      <rect x="2" y="4.5" width="20" height="1.5" fill="#FFFFFF" />
      <rect x="2" y="7.5" width="20" height="1.5" fill="#FFFFFF" />
      <rect x="2" y="10.5" width="20" height="1.5" fill="#FFFFFF" />
      <rect x="2" y="13.5" width="20" height="1.5" fill="#FFFFFF" />
      <rect x="2" y="16.5" width="20" height="1.5" fill="#FFFFFF" />
      <rect x="2" y="19.5" width="20" height="1.5" fill="#FFFFFF" />
      
      {/* Blue Canton */}
      <rect x="2" y="3" width="8" height="8" fill="#3C3B6E" />
      
      {/* Stars (simplified as small white dots) */}
      <circle cx="3.5" cy="4.5" r="0.35" fill="#FFFFFF" />
      <circle cx="5" cy="4.5" r="0.35" fill="#FFFFFF" />
      <circle cx="6.5" cy="4.5" r="0.35" fill="#FFFFFF" />
      <circle cx="8" cy="4.5" r="0.35" fill="#FFFFFF" />
      <circle cx="9.5" cy="4.5" r="0.35" fill="#FFFFFF" />
      
      <circle cx="4.25" cy="5.5" r="0.35" fill="#FFFFFF" />
      <circle cx="5.75" cy="5.5" r="0.35" fill="#FFFFFF" />
      <circle cx="7.25" cy="5.5" r="0.35" fill="#FFFFFF" />
      <circle cx="8.75" cy="5.5" r="0.35" fill="#FFFFFF" />
      
      <circle cx="3.5" cy="6.5" r="0.35" fill="#FFFFFF" />
      <circle cx="5" cy="6.5" r="0.35" fill="#FFFFFF" />
      <circle cx="6.5" cy="6.5" r="0.35" fill="#FFFFFF" />
      <circle cx="8" cy="6.5" r="0.35" fill="#FFFFFF" />
      <circle cx="9.5" cy="6.5" r="0.35" fill="#FFFFFF" />
      
      <circle cx="4.25" cy="7.5" r="0.35" fill="#FFFFFF" />
      <circle cx="5.75" cy="7.5" r="0.35" fill="#FFFFFF" />
      <circle cx="7.25" cy="7.5" r="0.35" fill="#FFFFFF" />
      <circle cx="8.75" cy="7.5" r="0.35" fill="#FFFFFF" />
      
      <circle cx="3.5" cy="8.5" r="0.35" fill="#FFFFFF" />
      <circle cx="5" cy="8.5" r="0.35" fill="#FFFFFF" />
      <circle cx="6.5" cy="8.5" r="0.35" fill="#FFFFFF" />
      <circle cx="8" cy="8.5" r="0.35" fill="#FFFFFF" />
      <circle cx="9.5" cy="8.5" r="0.35" fill="#FFFFFF" />
      
      <circle cx="4.25" cy="9.5" r="0.35" fill="#FFFFFF" />
      <circle cx="5.75" cy="9.5" r="0.35" fill="#FFFFFF" />
      <circle cx="7.25" cy="9.5" r="0.35" fill="#FFFFFF" />
      <circle cx="8.75" cy="9.5" r="0.35" fill="#FFFFFF" />
      
      <circle cx="3.5" cy="10.5" r="0.35" fill="#FFFFFF" />
      <circle cx="5" cy="10.5" r="0.35" fill="#FFFFFF" />
      <circle cx="6.5" cy="10.5" r="0.35" fill="#FFFFFF" />
      <circle cx="8" cy="10.5" r="0.35" fill="#FFFFFF" />
      <circle cx="9.5" cy="10.5" r="0.35" fill="#FFFFFF" />
    </svg>
  );
}
