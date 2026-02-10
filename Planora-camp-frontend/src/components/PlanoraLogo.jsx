const PlanoraLogo = ({ width = 420, height = 300 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 420 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9b5cff" />
          <stop offset="100%" stopColor="#ff7a18" />
        </linearGradient>
      </defs>

      {/* Brand Text */}
      <text
        x="210"
        y="50"
        textAnchor="middle"
        fontSize="36"
        fontWeight="600"
        fontFamily="Poppins, Arial, sans-serif"
        fill="#d26aa5"
      >
        Planora
      </text>

      {/* Semi Circle */}
      <path
        d="M110 180 A100 100 0 0 1 310 180"
        fill="none"
        stroke="url(#grad)"
        strokeWidth="14"
      />

      {/* Monitor */}
      <rect
        x="150"
        y="120"
        rx="8"
        ry="8"
        width="120"
        height="70"
        fill="none"
        stroke="url(#grad)"
        strokeWidth="6"
      />

      <line
        x1="210"
        y1="190"
        x2="210"
        y2="210"
        stroke="url(#grad)"
        strokeWidth="5"
      />

      <line
        x1="180"
        y1="210"
        x2="240"
        y2="210"
        stroke="url(#grad)"
        strokeWidth="5"
      />

      {/* People Icons */}
      <circle cx="265" cy="150" r="14" fill="#2b2b2b" />
      <circle cx="285" cy="150" r="14" fill="#2b2b2b" />
      <circle cx="275" cy="170" r="14" fill="#2b2b2b" />
    </svg>
  );
};

export default PlanoraLogo;
