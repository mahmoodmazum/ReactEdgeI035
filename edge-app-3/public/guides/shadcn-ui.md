# shadcn/ui Setup — Step-by-Step Guide

## Prerequisites
- React + Vite project
- Tailwind CSS already configured

## Step 1 — Initialize shadcn/ui

```bash
npx shadcn@latest init
```

Answer the prompts:
- Style: **Default**
- Base color: **Slate** (or your choice)
- CSS variables: **Yes**

This creates/updates: `tailwind.config.js`, `src/index.css`, and `src/lib/utils.ts`.

## Step 2 — Add components on demand

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add card
npx shadcn@latest add badge
```

Each command copies the component into `src/components/ui/`.

## Step 3 — Use in your component

```jsx
import { Button } from "@/components/ui/button"
import { Input }  from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function LoginForm() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Button className="w-full">Sign In</Button>
        <Button variant="outline" className="w-full">Cancel</Button>
      </CardContent>
    </Card>
  )
}
```

## Button Variants

```jsx
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

## Why shadcn/ui?

- **You own the code** — components live in `src/components/ui/`
- **Accessible** — built on Radix UI with full ARIA support
- **Customizable** — change Tailwind classes, structure, anything
- **Dark mode ready** — CSS variables + Tailwind dark mode
- **No version lock-in** — it's just code in your project
