/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, Shield, Zap, Target, Lock, Unlock, ChevronRight, Search, Star, Trash2 } from 'lucide-react';

type Stage = 0 | 1 | 2 | 3 | 4 | 5;

export default function App() {
  const [stage, setStage] = useState<Stage>(0);
  const [input1, setInput1] = useState('');
  const [input3, setInput3] = useState('');
  const [isCamouflageOff, setIsCamouflageOff] = useState(false);
  const [isSquareFound, setIsSquareFound] = useState(false);
  const [finalCode, setFinalCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Answers
  const DIGIT_1 = '3'; // From 30%
  const DIGIT_2 = '7'; // From the black square
  const DIGIT_3 = '2'; // From 5-1-1-1

  const nextStage = () => {
    if (stage < 5) setStage((prev) => (prev + 1) as Stage);
  };

  const startGame = () => setStage(1);

  const handleStage1 = () => {
    if (input1.trim() === '30' || input1.trim() === '3') {
      nextStage();
    }
  };

  const handleStage3 = () => {
    if (input3.trim() === '2') {
      nextStage();
    }
  };

  const handleFinal = () => {
    if (finalCode.trim() === `${DIGIT_1}${DIGIT_2}${DIGIT_3}`) {
      setShowSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-orange-500 selection:text-black">
      {/* Comic Space Background */}
      <div 
        className="fixed inset-0 opacity-20 grayscale contrast-125 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'url("https://picsum.photos/seed/space-comic-v3/1920/1080")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Background Stars */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {/* Start Screen */}
          {stage === 0 && (
            <motion.div
              key="start"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="max-w-2xl w-full p-8 bg-zinc-900/90 border-4 border-orange-500 rounded-xl shadow-[0_0_50px_rgba(249,115,22,0.3)] backdrop-blur-md relative overflow-hidden ring-8 ring-black/50 flex flex-col items-center justify-center text-center"
            >
              <button
                onClick={startGame}
                className="w-full flex flex-col items-center justify-center gap-6"
                aria-label="Uruchom grę"
              >
                <img
                  src="./img/start-here.svg"
                  alt="Start"
                  className="w-72 h-72 object-contain drop-shadow-[0_0_30px_rgba(249,115,22,0.25)]"
                />
                <p className="text-zinc-300 font-black uppercase tracking-[0.4em] text-xs">
                  Kliknij aby rozpocząć
                </p>
              </button>
            </motion.div>
          )}

          {/* Intro Screen */}
          {stage === 1 && (
            <motion.div
              key="stage1"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="max-w-2xl w-full p-8 bg-zinc-900/90 border-4 border-orange-500 rounded-xl shadow-[0_0_50px_rgba(249,115,22,0.3)] backdrop-blur-md relative overflow-hidden ring-8 ring-black/50"
            >
              {/* Comic Corner Accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500 rotate-45 flex items-end justify-center pb-2 shadow-lg">
                <span className="text-black font-black text-xs -rotate-45">PILNE!</span>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-orange-500 rounded-lg shadow-lg">
                  <Rocket className="w-10 h-10 text-black" />
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter italic leading-none">
                  ETAP 1: „Kod do Systemu - WERYFIKACJA REKRUTA"
                </h1>
              </div>
              
              <div className="flex gap-6 mb-8 items-start">
                <div className="flex-1 bg-black/40 p-4 rounded border-l-4 border-orange-500">
                  <p className="text-zinc-300 font-bold leading-relaxed italic">
                    "Aby przywrócić stabilność w galaktyce musisz przejść procedurę autoryzacji. Do roboty żołnierzu!"
                  </p>
                </div>
                <div className="w-28 h-28 rounded-lg border-4 border-zinc-700 overflow-hidden shrink-0 shadow-2xl rotate-2">
                  <img 
                    src="./img/janusz.png" 
                    alt="Admirał" 
                    className="w-full h-full object-cover grayscale contrast-125"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-zinc-950 p-8 rounded-lg border-4 border-zinc-800 shadow-inner relative">
                  <div className="absolute top-2 right-4 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse delay-75" />
                  </div>
                  <h2 className="text-xl font-black mb-6 text-orange-400 italic flex items-center gap-2 uppercase tracking-widest">
                    <Zap className="w-6 h-6 fill-current" /> Łamigłówka:
                  </h2>
                  <p className="text-2xl mb-8 font-black tracking-tight text-white">Ile procent z siebie daje wzorowy żołnierz gwiezdnej floty?</p>
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={input1}
                      onChange={(e) => setInput1(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleStage1()}
                      placeholder="Wpisz wartość..."
                      className="w-full bg-zinc-900 border-4 border-zinc-800 rounded-lg px-6 py-4 focus:border-orange-500 outline-none transition-all text-4xl font-mono text-center shadow-2xl placeholder:text-zinc-700"
                    />
                    <button
                      onClick={handleStage1}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black px-8 py-4 rounded-lg transition-all transform active:scale-95 uppercase italic text-2xl shadow-[0_5px_0_rgb(194,65,12)] hover:translate-y-1 hover:shadow-none"
                    >
                      Weryfikuj Autoryzację
                    </button>
                  </div>
                  <p className="mt-6 text-xs text-zinc-600 uppercase tracking-[0.2em] font-black text-center">
                    Podpowiedź: Kod to pierwsza cyfra tej wartości.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Stage 2 */}
          {stage === 2 && (
            <motion.div
              key="stage2"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="max-w-2xl w-full p-8 bg-zinc-900/90 border-4 border-cyan-500 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.3)] backdrop-blur-md relative ring-8 ring-black/50"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-cyan-500 rounded-lg shadow-lg">
                  <Shield className="w-10 h-10 text-black" />
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter italic leading-none">
                  ETAP 2: STREFA RADAROWA - WYŁĄCZ KAMUFLAŻ
                </h1>
              </div>

              <div className="relative aspect-video bg-black rounded-xl border-8 border-zinc-800 overflow-hidden group cursor-crosshair shadow-2xl">
                {/* Radar Grid */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  <div className="w-full h-full grid grid-cols-12 grid-rows-8 border border-cyan-500/30" />
                </div>
                
                {/* Radar Sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent w-1/2 animate-[radar_3s_linear_infinite]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  {!isCamouflageOff ? (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsCamouflageOff(true)}
                      className="w-36 h-36 rounded-full bg-cyan-500/10 border-[12px] border-cyan-500 flex items-center justify-center animate-pulse shadow-[0_0_70px_rgba(6,182,212,0.5)]"
                    >
                      <Zap className="w-16 h-16 text-cyan-500 fill-current" />
                    </motion.button>
                  ) : (
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0, rotate: 10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="text-8xl font-black text-cyan-400 mb-6 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] italic"
                      >
                        WYŁĄCZONO
                      </motion.div>
                      <button
                        onClick={nextStage}
                        className="bg-cyan-500 hover:bg-cyan-600 text-black font-black px-12 py-5 rounded-full transition-all flex items-center gap-3 mx-auto uppercase italic text-2xl shadow-[0_5px_0_rgb(8,145,178)] hover:translate-y-1 hover:shadow-none"
                      >
                        Maszeruj do Sektora 3 <ChevronRight className="w-8 h-8" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-8 text-center text-zinc-600 uppercase italic font-black tracking-[0.4em] text-sm">
                To rozkaz, a nie prośba!
              </p>
            </motion.div>
          )}

          {/* Stage 3 */}
          {stage === 3 && (
            <motion.div
              key="stage3"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="max-w-2xl w-full p-8 bg-zinc-900/90 border-4 border-red-500 rounded-xl shadow-[0_0_50px_rgba(239,68,68,0.3)] backdrop-blur-md relative ring-8 ring-black/50"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-500 rounded-lg shadow-lg">
                  <Target className="w-10 h-10 text-black" />
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter italic leading-none">
                  ETAP 3: Operacja Laserowy Gniew
                </h1>
              </div>

              <div className="bg-zinc-950 p-8 rounded-lg border-4 border-zinc-800 shadow-inner">
                <div className="flex gap-6 mb-8 items-center">
                  <div className="flex-1">
                    <h2 className="text-xl font-black mb-4 text-red-500 italic uppercase tracking-widest">Zagadka:</h2>
                    <p className="text-2xl font-black leading-tight text-white mb-4">
                      Admirał Jachaś miał 5 batoników. Jednego zabrał mu skurwol, drugiego sam zjadł ze stresu, a trzeciego 'pożyczył' :D 
                    </p>
                    <p className="text-red-500 font-black text-3xl italic underline decoration-4 underline-offset-8">Ile batoników zostało Jachyrze?</p>
                  </div>
                  <div className="w-32 h-32 rounded-xl border-4 border-red-900 overflow-hidden shrink-0 shadow-2xl -rotate-3">
                    <img 
                      src="./img/admiralJachas.png" 
                      alt="Batoniki" 
                      className="w-full h-full object-cover grayscale contrast-150 brightness-75"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={input3}
                    onChange={(e) => setInput3(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleStage3()}
                    placeholder="Wynik..."
                    className="w-full bg-zinc-900 border-4 border-zinc-800 rounded-lg px-6 py-4 focus:border-red-500 outline-none transition-all text-4xl font-mono text-center shadow-2xl"
                  />
                  <button
                    onClick={handleStage3}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black px-8 py-4 rounded-lg transition-all transform active:scale-95 uppercase italic text-2xl shadow-[0_5px_0_rgb(153,27,27)] hover:translate-y-1 hover:shadow-none"
                  >
                    Strzelaj z Lasera
                  </button>
                </div>
                <p className="mt-6 text-xs text-zinc-600 uppercase tracking-[0.2em] font-black text-center">
                  Podpowiedź: To Twoja ostatnia cyfra.
                </p>
              </div>
            </motion.div>
          )}

          {/* Stage 4 */}
          {stage === 4 && (
            <motion.div
              key="stage4"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="max-w-2xl w-full p-8 bg-zinc-900/90 border-4 border-purple-500 rounded-xl shadow-[0_0_50px_rgba(168,85,247,0.3)] backdrop-blur-md relative ring-8 ring-black/50"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-500 rounded-lg shadow-lg">
                  <Zap className="w-10 h-10 text-black fill-current" />
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter italic leading-none">
                  ETAP 4: „Logika Admirała”
                </h1>
              </div>

              <div className="space-y-8">
                <div className="bg-black/60 p-4 rounded border-l-4 border-purple-500">
                  <p className="text-zinc-300 italic font-black text-lg">"Aby odczytać musisz użyć lasera i zlikwidować sułtana &gt; 7"</p>
                </div>
                
                <div className="grid grid-cols-3 gap-8 h-64">
                  <div className="bg-zinc-950 rounded-2xl border-4 border-zinc-800 flex items-center justify-center text-6xl font-black opacity-20 shadow-inner">2</div>
                  <div className="relative">
                    {!isSquareFound ? (
                      <button
                        onClick={() => setIsSquareFound(true)}
                        className="absolute inset-0 bg-black border-4 border-purple-500/50 hover:border-purple-500 transition-all flex items-center justify-center group rounded-2xl shadow-2xl overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
                        <img src="./img/sultan_kosmitow.png" alt="Candy Bar" className="w-16 h-16 object-cover" />
                        <div className="w-16 h-16 bg-purple-500/20 group-hover:bg-purple-500/40 rounded-lg shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all group-hover:scale-110" />
                      </button>
                    ) : (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute inset-0 bg-purple-600 text-black flex items-center justify-center text-8xl font-black rounded-2xl shadow-[0_0_60px_rgba(168,85,247,0.6)] border-4 border-white/20"
                      >
                        {DIGIT_2}
                      </motion.div>
                    )}
                  </div>
                  <div className="bg-zinc-950 rounded-2xl border-4 border-zinc-800 flex items-center justify-center text-6xl font-black opacity-20 shadow-inner">4</div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-zinc-600 uppercase mb-8 font-black tracking-widest leading-relaxed">Zadanie: znajdź i odkryj czarny kwadrat. <br/> To druga cyfra do hasła końcowego.</p>
                  {isSquareFound && (
                    <button
                      onClick={nextStage}
                      className="bg-purple-500 hover:bg-purple-600 text-black font-black px-12 py-5 rounded-full transition-all flex items-center gap-3 mx-auto uppercase italic text-2xl shadow-[0_5px_0_rgb(126,34,206)] hover:translate-y-1 hover:shadow-none"
                    >
                      Finalna Autoryzacja <ChevronRight className="w-8 h-8" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Final Stage */}
          {stage === 5 && (
            <motion.div
              key="stage5"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="max-w-2xl w-full p-8 bg-zinc-900/90 border-8 border-yellow-500 rounded-2xl shadow-[0_0_80px_rgba(234,179,8,0.5)] backdrop-blur-md text-center relative overflow-hidden ring-[16px] ring-black/50"
            >
              {!showSuccess ? (
                <>
                  <div className="absolute top-0 left-0 w-full h-3 bg-yellow-500 animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-full h-3 bg-yellow-500 animate-pulse" />
                  
                  <div className="relative inline-block mb-8">
                    <Lock className="w-28 h-28 text-yellow-500 mx-auto animate-bounce" />
                    <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full -z-10" />
                  </div>
                  
                  <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-6 leading-none">
                    KOD DOSTĘPU SKOMPLETOWANY!
                  </h1>
                  <p className="text-zinc-400 mb-10 font-black text-lg uppercase tracking-widest">
                    Połącz cyfry i wpisz w wyszukiwarkę <br/> <span className="text-yellow-500">Ctrl+F</span> i teleportuj się do skarbu
                  </p>
                  
                  <div className="flex flex-col items-center gap-10">
                    <input
                      type="text"
                      value={finalCode}
                      onChange={(e) => setFinalCode(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleFinal()}
                      placeholder="???"
                      maxLength={3}
                      className="w-80 bg-zinc-950 border-8 border-yellow-500/50 rounded-2xl px-6 py-8 focus:border-yellow-500 outline-none transition-all text-7xl font-mono text-center tracking-[1.5rem] shadow-[inset_0_0_30px_rgba(0,0,0,1)] text-yellow-500"
                    />
                    <button
                      onClick={handleFinal}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-black px-20 py-6 rounded-full text-4xl transition-all transform hover:scale-105 uppercase italic shadow-[0_15px_0_rgb(161,98,7)] hover:translate-y-2 hover:shadow-none"
                    >
                      Autoryzuj
                    </button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-12"
                >
                  <div className="relative inline-block mb-10">
                    <Unlock className="w-48 h-48 text-green-500 mx-auto drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]" />
                    <motion.div 
                      animate={{ scale: [1, 1.3, 1], rotate: [12, -12, 12] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute -top-6 -right-6 bg-green-500 text-black font-black px-6 py-2 rounded-lg text-2xl shadow-2xl"
                    >
                      BRAWO!
                    </motion.div>
                  </div>
                  <h1 className="text-8xl font-black text-green-500 uppercase italic mb-6 drop-shadow-[0_0_30px_rgba(34,197,94,0.6)] tracking-tighter">
                    SUKCES!
                  </h1>
                  <p className="text-4xl text-zinc-300 mb-12 font-black italic">
                    Stabilność galaktyki przywrócona.
                  </p>
                  <div className="bg-green-500/10 border-8 border-green-500 p-12 rounded-[3rem] shadow-[0_0_100px_rgba(34,197,94,0.3)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    <p className="text-6xl font-mono font-black text-green-400 tracking-tighter mb-4 flex items-center justify-center gap-4">
                      <span>SKARB ODBLOKOWANY</span>
                      <img src="./img/orzel1.png" alt="Skarb" className="w-16 h-16 object-cover inline-block align-middle" />
                    </p>
                    <p className="text-zinc-500 uppercase tracking-[0.5em] font-black text-xl">Admirał jest z Ciebie dumny!</p>
                  </div>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-20 text-zinc-600 hover:text-white transition-colors flex items-center gap-3 mx-auto font-black uppercase tracking-[0.3em] text-lg hover:scale-110 transform"
                  >
                    <Trash2 className="w-6 h-6" /> Resetuj System Autoryzacji
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes radar {
          from { transform: translateX(-100%); }
          to { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
