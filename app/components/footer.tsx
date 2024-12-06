export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 mx-auto max-w-screen-xl p-4 xl:p-0">
      <div className="flex flex-row items-center justify-center h-10 w-full">
        <p className="text-muted-foreground text-sm text-center">
          {currentYear} - Footer
        </p>
      </div>
    </footer>
  );
}
