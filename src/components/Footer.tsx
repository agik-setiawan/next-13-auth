import ClientProvider from "./ClientProvider";

export default function Footer() {
  return (
    <ClientProvider>
      <footer className="bg-gray-300 text-center lg:text-left absolute bottom-0 left-0 w-full">
        <div className="text-gray-700 text-center p-4">
          © 2023 Copyright &nbsp;
          <a className="text-gray-800" href="/">
            Mywebsite
          </a>
        </div>
      </footer>
    </ClientProvider>
  );
}
