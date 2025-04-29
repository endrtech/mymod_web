import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="mt-4 flex flex-1 flex-col overflow-hidden w-full">
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden w-full px-4 pb-4 md:px-6 md:pb-6 gap-4 md:gap-6 @container/main">
          <h1 className="text-white text-2xl font-bold">Welcome back!</h1>
          <SectionCards />
          <div className="px-2 md:px-4 w-full">
            <ChartAreaInteractive />
          </div>
          {/*<DataTable data={data} />*/}
        </div>
      </div>
    </div>
  );
}
