"use client";

import { useParams } from "next/navigation";

function BookDetails() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  console.log(id);

  return <div>BookDetails</div>;
}

export default BookDetails;
