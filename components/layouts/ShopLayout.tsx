import Head from "next/head";
import { Navbar } from "../ui";

interface ShopLayoutProps {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

const ShopLayout: React.FC<ShopLayoutProps> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={pageDescription} />
        {imageFullUrl && <meta property="og:image" content={imageFullUrl} />}
      </Head>
      <nav>
        <Navbar />
      </nav>

      {/* TODO: sidebar */}

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        {children}
      </main>

      <footer>{/* TODO: footer */}</footer>
    </>
  );
};

export default ShopLayout;
