// This is the whole app layout file. It is used to wrap all the pages.
// frontend/src/app/layout.tsx
import type { ReactNode } from "react";

export const metadata = {
  title: "Kambaz App",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}