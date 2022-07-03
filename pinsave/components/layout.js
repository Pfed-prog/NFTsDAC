import Navbar from "./navbar";

export default function Layout({ children, client }) {
  return (
    <>
      <Navbar client={client} />
      <main>{children}</main>
    </>
  );
}
