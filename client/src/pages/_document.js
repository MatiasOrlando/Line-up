import { Html, Head, Main, NextScript } from 'next/document'
import Header from '@/components/Header/Header'
import Message from '@/components/PromotionalMessage/Message'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Message />
        <Header />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
