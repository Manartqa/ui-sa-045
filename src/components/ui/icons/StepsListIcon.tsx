import React from "react";

/**
 * "6 ขั้นตอนการยื่นคำขออนุญาต" — boxed list from the design system.
 *
 * Props are forwarded to the `<svg>`: antd's Menu clones the icon element to
 * add `ant-menu-item-icon`, which carries the gap between icon and label. Drop
 * the spread and the class never reaches the DOM and the label sits flush.
 */
export default function StepsListIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      style={{ fontSize: 16 }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z" />
    </svg>
  );
}
