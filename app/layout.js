import './globals.css';


export const metadata = {
  title: 'Memories Backend',
  description: 'Memories Project created by Aman Singh Bhogal, this is its new backend created in Nextjs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
