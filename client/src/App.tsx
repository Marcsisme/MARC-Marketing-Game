import { useEffect } from "react";
import Game from "./game/Game";
import { useAudio } from "./lib/stores/useAudio";
import { useGameState } from "./lib/stores/useGameState";
import "@fontsource/inter";

// Main App component
function App() {
  const { isMuted, toggleMute, setBackgroundMusic } = useAudio();
  const { gamePhase, initGame } = useGameState();

  // Initialize audio elements
  useEffect(() => {
    // Create and set up background music
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    setBackgroundMusic(bgMusic);

    // Create hit sound for interactions
    const hitSfx = new Audio("/sounds/hit.mp3");
    hitSfx.volume = 0.5;
    useAudio.getState().setHitSound(hitSfx);

    // Create success sound for achievements
    const successSfx = new Audio("/sounds/success.mp3");
    successSfx.volume = 0.5;
    useAudio.getState().setSuccessSound(successSfx);

    // Initialize the game
    initGame();

    return () => {
      bgMusic.pause();
      hitSfx.pause();
      successSfx.pause();
    };
  }, []);

  // Play background music when ready (but respect mute setting)
  useEffect(() => {
    const bgMusic = useAudio.getState().backgroundMusic;
    if (bgMusic) {
      if (!isMuted) {
        bgMusic.play().catch(err => console.log("Audio playback was prevented:", err));
      } else {
        bgMusic.pause();
      }
    }
  }, [isMuted]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background">
      <div className="relative w-full h-full max-w-6xl max-h-[800px] overflow-hidden">
        <Game />
        
        {/* Audio controls */}
        <button 
          onClick={toggleMute}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>
    </div>
  );
}

export default App;
