# Vitest Testing Setup — Step-by-Step Guide

## Step 1 — Install dependencies

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

## Step 2 — Configure vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',   // simulate a browser
    globals: true,          // auto-import describe/it/expect
    setupFiles: './src/test/setup.js',
  },
})
```

## Step 3 — Create setup file

```js
// src/test/setup.js
import '@testing-library/jest-dom'
```

## Step 4 — Write a unit test

```js
// src/utils.test.js
import { describe, it, expect } from 'vitest'
import { add } from './utils'

describe('add()', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5)
  })
  it('handles negatives', () => {
    expect(add(-1, 1)).toBe(0)
  })
})
```

## Step 5 — Write a component test

```jsx
// src/components/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Button from './Button'

it('calls onClick when clicked', () => {
  const fn = vi.fn()
  render(<Button onClick={fn}>Click me</Button>)
  fireEvent.click(screen.getByText('Click me'))
  expect(fn).toHaveBeenCalledOnce()
})
```

## Step 6 — Run tests

```bash
npx vitest          # watch mode (re-runs on file change)
npx vitest run      # single run (for CI)
npx vitest --coverage  # generate coverage report
```

## Key APIs

| API | Purpose |
|-----|---------|
| `describe()` | Group related tests |
| `it()` / `test()` | One test case |
| `expect(x).toBe(y)` | Assert exact equality |
| `expect(x).toEqual(y)` | Deep equality (objects/arrays) |
| `vi.fn()` | Create a mock function |
| `render()` | Render a React component |
| `screen.getByText()` | Find element by visible text |
| `fireEvent.click()` | Simulate user click |
