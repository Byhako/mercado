import Image from 'next/image'

export default function Home() {
  return (
    <section className="container">
      <h1 className="first_title">Compra aquí tus mejores productos.</h1>
      <Image
        src='/banner.webp'
        alt='banner'
        className="img_banner"
        width={600}
        height={160}
      />
    </section>
  )
}
