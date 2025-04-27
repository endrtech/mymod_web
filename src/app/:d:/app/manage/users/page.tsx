import { getClerkUsers } from "@/app/actions/getClerkUsers";
import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";

export default async function ThemeGalleryReviewQueue() {
  const response: Payment[] = await getClerkUsers();
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <SiteHeader />
      <div className="mt-4 flex flex-1 flex-col overflow-hidden w-full">
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden w-full px-4 pb-4 md:px-6 md:pb-6 gap-4 md:gap-6 @container/main">
          <h1 className="text-white text-2xl font-bold">Users</h1>
          <div className="-mt-6">
            <DataTable columns={columns} data={response} />
          </div>
        </div>
      </div>
    </div>
  );
}
