import Link from "next/link"

export default function NewCompanyPage() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card p-4 border-r border-muted">
        <nav>
          <ul>
            <li>
              <Link href="/" className="block px-3 py-2 hover:bg-muted rounded-md">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/companies" className="block bg-muted px-3 py-2 text-primary rounded-md">
                Companies
              </Link>
            </li>
            <li>
              <Link href="/reports" className="block px-3 py-2 hover:bg-muted rounded-md">
                Reports
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">New Company</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/companies" className="font-bold text-foreground border-b-2 border-primary pb-1">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-primary">
                  Reports
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Content Area */}
        <div className="bg-card rounded-md p-4">
          <p>This is the new company page.</p>
          {/* Add your form or other content here */}
        </div>
      </main>
    </div>
  )
}
