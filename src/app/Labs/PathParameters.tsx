import Link from "next/link";
export default function PathParameters() {
  return (
    <div id="wd-path-parameters">
      <h2>Path Parameters</h2>
      <Link href="/Labs/Lab3/add/1/2">1 + 2</Link> <br />
      <Link href="/Labs/Lab3/add/3/4">3 + 4</Link>
    </div>
  );
}
