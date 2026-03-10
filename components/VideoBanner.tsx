interface VideoBannerProps {
  src: string
  title?: string
  subtitle?: string
}

export default function VideoBanner({ src, title, subtitle }: VideoBannerProps) {
  return (
    <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-rosa-900/60 via-rosa-900/40 to-rosa-900/70" />
      {(title || subtitle) && (
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
          {title && (
            <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4 animate-fade-in-up">{title}</h2>
          )}
          {subtitle && (
            <p className="text-lg md:text-xl text-white/80 max-w-2xl animate-fade-in-up">{subtitle}</p>
          )}
        </div>
      )}
    </section>
  )
}
