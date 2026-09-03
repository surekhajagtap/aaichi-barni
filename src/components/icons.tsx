/**
 * One icon family: 24px grid, 1.75 stroke, round caps/joins.
 * No emoji anywhere in the UI.
 */

type IconProps = {
  className?: string;
};

function base(className = "") {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: `h-6 w-6 ${className}`,
    "aria-hidden": true,
    focusable: false,
  };
}

export const BagIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const MenuIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const ArrowIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const PlusIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M5 12h14" />
  </svg>
);

export const CheckIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const AlertIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6M12 16.5v.5" />
  </svg>
);

export const HandIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11" />
    <path d="M12 11V4.5a1.5 1.5 0 0 1 3 0V11" />
    <path d="M15 11V6.5a1.5 1.5 0 0 1 3 0V13c0 4-2.5 7-6 7s-6-2.6-6-6v-3a1.5 1.5 0 0 1 3 0" />
  </svg>
);

export const LeafIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M4 20c0-8 5-13 16-14 1 10-4 15-11 15H4Z" />
    <path d="M4 20c4-5 8-8 12-9.5" />
  </svg>
);

export const ScrollIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
    <path d="M9 9h6M9 13h6M9 17h3" />
  </svg>
);

export const MangoIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M18 8c2.5 4-.5 12-6 12S3.5 15 5.5 10.5C7 7 10 6 12 6.5" />
    <path d="M14 5c1.5-1.5 4-1.5 5 0-1 1.5-3.5 2-5 0Z" />
  </svg>
);

export const BatchIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M8 3h8v3l-1 1v3l3 5v6H6v-6l3-5V7L8 6V3Z" />
    <path d="M7 16h10" />
  </svg>
);

export const HeartIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M12 20s-7-4.4-7-9.3A4 4 0 0 1 12 8a4 4 0 0 1 7 2.7C19 15.6 12 20 12 20Z" />
  </svg>
);

export const TruckIcon = ({ className }: IconProps) => (
  <svg {...base(className)}>
    <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </svg>
);
