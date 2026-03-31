import { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TOC from "./TOC";
export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <table>
      <tbody>
        <tr>
          <td valign="top" width="100px">
            <TOC />
          </td>
          <td valign="top">{children}</td>
        </tr>
      </tbody>
    </table>
  );
}
