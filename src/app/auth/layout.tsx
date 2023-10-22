export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center dark" >{children}</div>
  );
}
