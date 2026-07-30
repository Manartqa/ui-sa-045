# ui-sa-045 — conventions

This project follows the **`nextjs-pattern-generator`** skill. Invoke that skill
(`/anthropic-skills:nextjs-pattern-generator`) before scaffolding any new page or
feature, and follow its folder structure, naming, and data-flow rules.

## Locked stack (do not bump without a version gate)

| Package | Version | Why locked |
|---|---|---|
| next | 15.5.x | — |
| react / react-dom | 18.3.x | antd 6 / MUI 9 / Mantine 9 need React 19 |
| antd | 5.29.x | React 18 line — **do not upgrade to antd 6** |
| @ant-design/nextjs-registry | 1.2.0 (exact) | 1.3.0 targets antd 6 and its loose peer pulls cssinjs 2 |
| @ant-design/cssinjs | 1.24.0 (exact) | Must be a **single instance** shared with antd |
| @tanstack/react-query | 5.x | — |

`@ant-design/cssinjs` is a *peer* dependency of the registry. If `antd` and
`@ant-design/nextjs-registry` ever resolve to different cssinjs majors, the
registry extracts no CSS into the SSR HTML and every cold-loaded page renders
unstyled. Verify with:

```bash
node -e "const p=require('path');const r=(f,m)=>require(require.resolve(m+'/package.json',{paths:[p.dirname(require.resolve(f+'/package.json'))]})).version;console.log('antd',r('antd','@ant-design/cssinjs'),'| registry',r('@ant-design/nextjs-registry','@ant-design/cssinjs'))"
```

Both must print the same version.

## Data flow

```
lib/api/api-main.ts → services/*.service.ts → hooks/<feature>/use*.ts → components/partials/<Feature>/
```

- There is **no backend yet.** Services return fixtures from `src/mocks/` and
  carry a commented-out real call. Swap the service body when the API lands —
  hooks and components must not change.
- Components never import from `src/mocks/` directly; they take data as props or
  read it through a hook.
- Every hook exports an `as const` `*_QUERY_KEY`.
- `useSearchPersist` for any filterable page.
- React Query defaults: `staleTime: 0, gcTime: 0`.

## Provider order (`src/app/layout.tsx`)

`AntdRegistry → QueryProvider → UIProvider → app`

`NextAuthProvider` slots above `QueryProvider` when real auth exists. Today auth
is a mock in `src/lib/auth.ts` + `src/mocks/users.ts` (`admin` / `user`, both
`P@ssw0rd`), stored in `sessionStorage`.

## Styling notes specific to this repo

- **Tailwind preflight is disabled** (`tailwind.config.ts`) because antd ships
  its own reset. Consequences: `<p>` keeps UA margins (add `m-0`), `box-sizing`
  is `content-box` by default, and `body { margin: 0 }` is set manually in
  `globals.css`.
- antd scopes its CSS with `:where()` (zero specificity), so a plain
  `.my-class .ant-thing` selector in `globals.css` overrides it without
  `!important`. Prefer that over `!important`.
- Brand colors live in `src/theme/tokens.ts`; antd semantic tokens are fed
  through `UIProvider`.

## Routes

- `(auth)/login/officer` — เจ้าหน้าที่ (accepts `admin` only)
- `(auth)/login/operator` — ผู้ประกอบการ (accepts `user` only)
- `/login` redirects to the officer screen; `/` redirects to `/login`
- `(admin)/*` — everything behind `AdminLayout`

There is no route guard yet: `(admin)` URLs are reachable without signing in.
