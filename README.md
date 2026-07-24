# SPF/iSPF — คําขออนุญาตสั่งหรือนําเข้าฯ แบบ อ.4 (Tab แบบคำขอ)

Implementation of one Figma screen (`node 4025:192000` — request detail page,
"แบบคำขอ" tab) from the *045 - SPF iSPF Demo* design file.

## Stack

- Next.js 15 (App Router) + TypeScript
- Ant Design 5 (+ `@ant-design/icons`, `@ant-design/nextjs-registry`)
- Tailwind CSS (utilities only; preflight disabled to not fight antd)
- React 18.3, Noto Sans Thai via `next/font`

## Run

```bash
npm install
npm run dev
# http://localhost:3000 → redirects to /request/import-weapon-a4
```

## Notes

- The screen is static (mock data in
  `src/components/partials/ImportRequestA4/ImportRequestA4.config.ts`).
- Only the "แบบคำขอ" tab is implemented; the other tabs are separate Figma
  screens and intentionally left empty.
- The navbar crest logo references a temporary Figma-exported asset URL
  (expires ~7 days). Download it to `public/logo.png` and update
  `src/components/layout/AdminLayout/Header/NavBar.tsx` for production.
- Responsive: desktop and tablet (sidebar auto-collapses below `lg`; field
  grids stack below `md`; wide tables scroll horizontally).
