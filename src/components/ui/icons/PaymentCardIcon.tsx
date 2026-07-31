import React from "react";

/** "รายการแจ้งชำระเงิน" — payment card from the design system. Props go to the
 *  `<svg>` so antd's `ant-menu-item-icon` class (and its gap) lands. */
export default function PaymentCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      style={{ fontSize: 16 }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
    >
      <rect
        width="416"
        height="288"
        x="48"
        y="144"
        fill="none"
        strokeLinejoin="round"
        strokeWidth="32"
        rx="48"
        ry="48"
      />
      <path
        fill="none"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M411.36 144v-30A50 50 0 0 0 352 64.9L88.64 109.85A50 50 0 0 0 48 159v49"
      />
      <path d="M368 320a32 32 0 1 1 32-32 32 32 0 0 1-32 32z" />
    </svg>
  );
}
