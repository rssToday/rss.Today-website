import { getCachedUser } from "@/lib/queries/user"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import "./globals.css";

export default async function LobbyLayout({
  children,
  modal,
}: React.PropsWithChildren<{
  modal: React.ReactNode
}>) {
  const user = await getCachedUser()

  return (
    <html>
      <body>
        <head>
          <title>rss.Today - synchronized with the world</title>
          <link rel="icon" href="/images/rss-24.png" />
        </head>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <SiteHeader user={user} />
          <main className="flex-1 items-center justify-items-center">
            {children}
            {modal}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
