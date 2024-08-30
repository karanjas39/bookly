export default function AccountHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-5xl text-center">Bookly&apos;s</p>
      <p className="text-sm">{title}</p>
    </div>
  );
}
