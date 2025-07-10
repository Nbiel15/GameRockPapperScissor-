'use client';
import { useRouter } from 'next/navigation';

export default function GameIntro() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/game'); // navigasi ke halaman utama game
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4 py-10">
      <div className="relative w-[360px] h-[720px] bg-black rounded-[2.5rem] shadow-2xl overflow-hidden border-[10px] border-gray-900">

        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-gray-900 rounded-b-xl z-20"></div>

      {/* Layar Konten */}
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/image/ChatGPT Image Jul 7, 2025, 10_24_34 AM.png')", // pastikan path benar!
              imageRendering: "pixelated"
            }}
          >
           <main className="w-full h-full p-6 flex flex-col items-center text-center bg-black/60 backdrop-blur-md">

            <p className="text-[30px] text-[#fff] font-bold text-center leading-snug [text-shadow:_2px_2px_0_#000,-2px_2px_0_#000,2px_-2px_0_#000,-2px_-2px_0_#000,0_2px_0_#000,2px_0_0_#000,0_-2px_0_#000,-2px_0_0_#000] mt-[130px] ">
                ROCK<br />
                
                PAPER<br />
                SCISSORS
            </p>

            <img
              src="/image/Gunting.png"
              alt='Gunting'
              className="  absolute top-[110px] left-[30px]   w-[40pxx] h-[40px] object-contain mt-[50px] z-0"
              style={{ imageRendering: 'pixelated' }}
            />

            <img
              src="/image/Kertas.png"
              alt='Kertas'
              className="absolute top-[110px] right-[30px] w-[40px] h-[40px] object-contain mt-[50px] z-0"
              style={{ imageRendering: 'pixelated' }}
            />

            <img
            src="/image/Batu.png"
            alt='Batu'
            className="absolute top-[40px] left-[150px] w-[40px] h-[40px] object-contain mt-[50px] z-0"
            style={{ imageRendering: 'pixelated' }}
            />



              <button
                onClick={handleStart}
                className="hover:scale-110 transition duration-300 ease-in-out cursor-pointer mt-[100px]"
              >
                <img
                  src="/image/ButtonPlay.png"
                  alt="Mulai Game"
                  className="w-[200px] h-[60px] object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </button>
          </main>

          </div>

        {/* Layar Luar */}
      </div>
    </div>
  );
}
