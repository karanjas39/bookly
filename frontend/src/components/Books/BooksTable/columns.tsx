"use client";

import { BookType } from "@/utils/types/apiTypes";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<BookType>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-left font-bold">Name</div>,
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "author",
    header: () => <div className="text-center font-bold">Author</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.original.author}</div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right font-bold">Price</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.original.price}</div>;
    },
  },
];
