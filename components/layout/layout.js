import MainNavigation from "./main-navigation";

export default function Layout({ children}) {
  return (
    <div>
      <MainNavigation />
      <main>{children}</main>
    </div>
  )
}