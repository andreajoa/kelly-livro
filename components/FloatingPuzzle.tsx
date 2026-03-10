export default function FloatingPuzzle(){

 return(

  <div className="fixed inset-0 -z-10 opacity-10">

   <img src="/background/puzzle1.svg" className="absolute top-20 left-20 animate-bounce"/>

   <img src="/background/puzzle2.svg" className="absolute bottom-20 right-20 animate-pulse"/>

  </div>

 )

}
