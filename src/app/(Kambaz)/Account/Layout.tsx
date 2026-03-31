// This is layout page for accounts.
// Creates a nested layout.
// Places all content of Sing in, Sing up and profile in a table and wraps all account pages.
// Puts navigation on the left column and children on the right

import { ReactNode } from "react";
import AccountNavigation from "./AccountNavigation";
export default function AccountLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz">
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <AccountNavigation />
            </td>
            <td valign="top" width="100%">
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
