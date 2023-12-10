import Document, { Head, Html, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <meta name="description" content="NextJS Blog" /> */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="I post about programming and web development." />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" /> 
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />

          <div id="notifications" />
        </body>
      </Html>

    )
  }
}

export default MyDocument