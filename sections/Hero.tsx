export default function Hero(){

 return(

 <section className="relative h-screen flex items-center justify-center text-white">

  <video
   autoPlay
   muted
   loop
   className="absolute w-full h-full object-cover">

   <source src="/video/banner 1 video.mp4"/>

  </video>

  <div className="relative text-center max-w-xl">

   <h1 className="text-4xl font-bold">

   Será que eu fiz algo errado?

   </h1>

   <p className="mt-4">

   A pergunta que mudou a vida de Kelly Marques.

   </p>

   <button className="mt-6 bg-pink-600 px-8 py-3 rounded">

   Conhecer essa história

   </button>

  </div>

 </section>

 )

}
