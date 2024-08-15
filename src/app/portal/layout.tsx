import { PortalBanner } from "@/components/portal-banner";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-scree">
      <PortalBanner />
      <div className="container flex flex-1 justify-center">
        {children}
      </div>
    </div>
  )
}

export default Layout