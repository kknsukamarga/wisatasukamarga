import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";

export const metadata: Metadata = {
  title: "Expenses",
  description: "A Expense tracker build using Tanstack Table.",
};

async function getData() {
  const filePath = path.join(
    process.cwd(),
    "/app/(protected)/dashboard/umkm/list/data-table-components",
    "data.json"
  );
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

export default async function WisataListPage() {
  const data = await getData();

  return (
    <div className="h-full flex-1 flex-col space-y-2 px-8 md:flex">
      <h1>List Data WISATA</h1>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Here&apos;s a list of your expenses for this month!
        </p>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
