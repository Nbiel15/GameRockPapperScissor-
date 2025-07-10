'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const choices = [
  {
    name: 'batu',
    playerImg: '/image/batup.png',
    computerImg: '/image/batuc.png',
    icon: 'image/BatuPixel.png',
  },
  {
    name: 'gunting',
    playerImg: '/image/guntip.png',
    computerImg: '/image/guntic.png',
    icon: 'image/GuntingPixel.png',
  },
  {
    name: 'kertas',
    playerImg: '/image/kertap.png',
    computerImg: '/image/kertac.png',
    icon: 'image/KertasPixel.png',
  },
];

export default function Home() {
  const [player, setPlayer] = useState('');
  const [computer, setComputer] = useState('');
  const [result, setResult] = useState('');
  const [playerLives, setPlayerLives] = useState(3);
  const [computerLives, setComputerLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  const router = useRouter();
  const handleBack = () => router.push('/');

  const play = (playerChoice) => {
    if (gameOver) return;

    const compChoice = choices[Math.floor(Math.random() * choices.length)].name;
    setPlayer(playerChoice);
    setComputer(compChoice);

    const outcome = determineWinner(playerChoice, compChoice);
    setResult(outcome);

    if (outcome === 'Menang!') {
      const newComputerLives = computerLives - 1;
      setComputerLives(newComputerLives);
      if (newComputerLives === 0) setGameOver(true);
    } else if (outcome === 'Kalah!') {
      const newPlayerLives = playerLives - 1;
      setPlayerLives(newPlayerLives);
      if (newPlayerLives === 0) setGameOver(true);
    }
  };

  const determineWinner = (p, c) => {
    if (p === c) return 'Seri';
    if (
      (p === 'batu' && c === 'gunting') ||
      (p === 'gunting' && c === 'kertas') ||
      (p === 'kertas' && c === 'batu')
    ) {
      return 'Menang!';
    }
    return 'Kalah!';
  };

  const getPlayerHand = (name) => choices.find((c) => c.name === name)?.playerImg;
  const getComputerHand = (name) => choices.find((c) => c.name === name)?.computerImg;
  const getIcon = (name) => choices.find((c) => c.name === name)?.icon;

  const resetGame = () => {
    setPlayer('');
    setComputer('');
    setResult('');
    setPlayerLives(3);
    setComputerLives(3);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4 py-10">
      <div
        className="relative w-[360px] h-[720px] bg-black rounded-[2.5rem] shadow-2xl overflow-hidden border-[10px] border-gray-900"
        style={{
          backgroundImage: "url('/image/BGPIXEL.png')",
          imageRendering: 'pixelated',
        }}
      >
        <div className="top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-gray-900 rounded-b-xl z-20 absolute" />

        <main className="items-center flex flex-col relative h-full w-full">
          <section className="relative w-full h-full flex flex-col justify-between items-center pb-[20px] pt-[60px]">

          

            {/* KOMPUTER TANGAN & NYAWA */}
            <div className="relative w-full flex justify-center items-center mt-[-100px]">
              {computer && (
                <img
                  src={getComputerHand(computer)}
                  alt="tangan-komputer"
                  className="w-[220px] h-[350px] absolute top-[40px] z-[5]"
                  style={{ imageRendering: 'pixelated' }}
                />
              )}
              <div className="absolute left-[20px] top-[50px] flex flex-col items-center gap-1 z-[10] mt-[20px]">
                <p className="text-white text-xs mb-1">Com</p>
                {[...Array(3)].map((_, i) => (
                  <img
                    key={i}
                    src={i < computerLives ? '/image/Nyawaada.png' : '/image/Nyawakurang.png'}
                    className="w-[20px] h-[20px]"
                    alt="nyawa"
                  />
                ))}
              </div>
            </div>

           {/* NOTIFIKASI RESULT & GAME OVER */} 
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[20] flex flex-col items-center space-y-2">
                {!gameOver && result && (
                  <div className={`px-4 py-2 rounded-lg text-center text-lg font-bold shadow-md text-white font-bold text-center leading-snug [text-shadow:_2px_2px_0_#000,-2px_2px_0_#000,2px_-2px_0_#000,-2px_-2px_0_#000,0_2px_0_#000,2px_0_0_#000,0_-2px_0_#000,-2px_0_0_#000] text-[#fff] text-[20px] ${
                    result === 'Menang!'
                      ? 'bg-green-500'
                      : result === 'Kalah!'
                      ? 'bg-red-500'
                      : 'bg-yellow-400 text-black'
                  }`}>
                    {result}
                  </div>
                )}

                {gameOver && (
                  <div className="text-center whitespace-nowrap text-[13px]   ">
                   <div
                      className={`w-screen border-4 border-black p-2 shadow-[4px_4px_0px_#000] bg-[#fff]   ${
                        playerLives === 0 ? 'bg-red-600' : 'bg-green-600'
                      }`}
                    >
                      {playerLives === 0 ? 'Komputer Menang Game Ini ' : 'Kamu Menang Game Ini! '}
                    </div>

                    <div className="flex justify-center items-center gap-[20px] mt-[20px]">
                      <button onClick={resetGame}>
                        <img
                          src="/image/Restart.png"
                          alt="Reset"
                          className="w-[40px] h-[40px] hover:scale-90 transition duration-300 ease-in-out cursor-pointer"
                        />
                      </button>
                      <button onClick={handleBack}>
                        <img
                          src="/image/HomeButton.png"
                          alt="Home"
                          className="w-[40px] h-[40px] hover:scale-90 transition duration-300 ease-in-out cursor-pointer"
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>


            {/* PLAYER TANGAN & NYAWA */}
            <div className="relative w-full flex justify-center items-center ">
              {player && (
                <img
                  src={getPlayerHand(player)}
                  alt="tangan-player"
                  className="w-[230px] h-[380px] absolute mb-[280px] z-[5] mr-[25px]"
                  style={{ imageRendering: 'pixelated' }}
                />
              )}
              <div className="absolute right-[20px] bottom-[130px] flex flex-col items-center gap-1 z-[10]">
                <p className="text-white text-xs mb-1">Gweh</p>
                {[...Array(3)].map((_, i) => (
                  <img
                    key={i}
                    src={i < playerLives ? '/image/Nyawaada.png' : '/image/Nyawakurang.png'}
                    className="w-[20px] h-[20px]"
                    alt="nyawa"
                  />
                ))}
              </div>

               <div className="flex justify-center gap-[30px] z-[10] mt-[-100px]">
              {choices.map((choice) => (
                <button
                  key={choice.name}
                  onClick={() => play(choice.name)}
                  disabled={gameOver}
                  title={choice.name}
                  className={`w-16 h-16 text-2xl rounded-full shadow-lg transition ${
                    gameOver ? 'bg-gray-400 cursor-not-allowed' : 'bg-white text-black hover:scale-110'
                  }`}
                >
                  <img
                    src={choice.icon}
                    alt={choice.name}
                    className="w-[80px] h-[80px] mx-auto hover:scale-90 transition duration-300 ease-in-out cursor-pointer"
                  />
                </button>
              ))}
            </div>
   


            </div>



          </section>
        </main>
      </div>
    </div>
  );
}
