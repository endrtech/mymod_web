import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <SiteHeader />
      <div className="mt-4 flex flex-1 flex-col overflow-hidden w-full">
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden w-full px-4 pb-4 md:px-6 md:pb-6 gap-4 md:gap-6 @container/main">
          <SectionCards />
          <div className="px-2 md:px-4 w-full">
            <ChartAreaInteractive />
          </div>
          {/*<DataTable data={data} />*/}
        </div>
      </div>
    </div>

  )
}
