# Lernt

## Project Structure

lernt/
├─ README.md
├─ pnpm-workspace.yaml
├─ package.json
├─ turbo.json
├─ tsconfig.json
├─ .gitignore
├─ .editorconfig
├─ .env.example
├─ docker-compose.dev.yml
│
├─ apps/
│  └─ web/
│     ├─ src/
│     ├─ next.config.mjs
│     ├─ tsconfig.json
│     └─ package.json
│
├─ packages/
│  ├─ domain/                         
│  │  ├─ primitives/
│  │  │  └─ ids.ts
│  │  ├─ model/
│  │  ├─ interfaces/
│  │  │  ├─ queries/
│  │  │  ├─ mutations/
│  │  │  └─ auth/                      
│  │  ├─ invariants/
│  │  ├─ index.ts
│  │  ├─ tsconfig.json
│  │  └─ package.json
│  │
│  ├─ application/                    
│  │  ├─ data-access/
│  │  ├─ entity-services/
│  │  ├─ aggregate-services/
│  │  ├─ auth/
│  │  ├─ index.ts
│  │  ├─ tsconfig.json
│  │  └─ package.json
│  │
│  ├─ services/                        
│  │  ├─ api/
│  │  │  ├─ routers/
│  │  │  ├─ trpc.ts
│  │  │  └─ index.ts
│  │  ├─ database/
│  │  │  ├─ schema/
│  │  │  ├─ connection/
│  │  │  └─ scripts/
│  │  │     ├─ migrate/
│  │  │     └─ seed/
│  │  ├─ auth/                         
│  │  ├─ index.ts
│  │  ├─ tsconfig.json
│  │  └─ package.json
│  │
│  ├─ ui/                              
│  │  ├─ src/
│  │  │  ├─ atoms/
│  │  │  │  ├─ Button/
│  │  │  │  │  ├─ Button.tsx
│  │  │  │  │  └─ index.ts
│  │  │  │  └─ TextInput/
│  │  │  │     ├─ TextInput.tsx
│  │  │  │     └─ index.ts
│  │  │  ├─ molecules/
│  │  │  │  └─ FormField/
│  │  │  │     ├─ FormField.tsx
│  │  │  │     └─ index.ts
│  │  │  ├─ organisms/
│  │  │  │  └─ AuthForm/
│  │  │  │     ├─ AuthForm.tsx
│  │  │  │     └─ index.ts
│  │  │  ├─ hooks/
│  │  │  │  └─ useDisclosure.ts
│  │  │  └─ styles/
│  │  │     └─ tokens.css
│  │  ├─ index.ts
│  │  ├─ tailwind.config.cjs
│  │  ├─ tsconfig.json
│  │  └─ package.json
│  │
│  ├─ utilities/                      
│  │  ├─ formatting/
│  │  ├─ validation/
│  │  ├─ logging/
│  │  ├─ env/
│  │  │  └─ index.ts
│  │  ├─ index.ts
│  │  ├─ tsconfig.json
│  │  └─ package.json
│  │
│  ├─ ts-config/                    
│  │  ├─ base.json
│  │  ├─ node-lib.json
│  │  ├─ next-app.json
│  │  ├─ test.json
│  │  └─ package.json
│  │
│  └─ tailwind-config/               
│     ├─ index.js
│     └─ package.json
│
└─ tooling/
   └─ ci/
      └─ pipeline.yml
