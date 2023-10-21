export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center dark bg-gradient-to-tr from-zinc-950  to-orange-400 ">{children}</div>
  );
}
