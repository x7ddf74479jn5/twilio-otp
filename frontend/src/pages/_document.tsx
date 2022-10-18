import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="ja" className="h-full bg-gray-50">
        <Head />
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
