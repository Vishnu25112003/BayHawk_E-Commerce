import { useState, useRef } from 'react';
import { X, Gift } from 'lucide-react';
import { Button } from './ui/button';

interface Prize {
  id: number;
  label: string;
  icon: string;
  color: string;
}

const prizes: Prize[] = [
  { id: 1, label: '30 days Free Delivery', icon: '🚚', color: '#8B5CF6' },
  { id: 2, label: '₹100 OFF', icon: '💸', color: '#7C3AED' },
  { id: 3, label: 'Free Gift', icon: '🎁', color: '#6D28D9' },
  { id: 4, label: '20% Discount', icon: '🎉', color: '#5B21B6' },
  { id: 5, label: 'Cashback ₹50', icon: '💵', color: '#4C1D95' },
  { id: 6, label: 'Free Shipping', icon: '📦', color: '#7C3AED' },
];

interface SpinWheelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpinWheel({ isOpen, onClose }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const segmentAngle = 360 / prizes.length;
    const prizeAngle = segmentAngle * randomIndex;
    const offset = segmentAngle / 2;
    
    // Calculate rotation to bring the center of the winning segment to the top (0deg)
    // We want (prizeAngle + offset + finalRotation) % 360 === 0
    // finalRotation = 360 - (prizeAngle + offset)
    const spins = 360 * 5; 
    const finalRotation = spins + (360 - prizeAngle - offset);
    
    setRotation(finalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(prizes[randomIndex]);
    }, 4000);
  };

  if (!isOpen) return null;

  // Generate conic gradient string dynamically based on prizes
  const gradientStops = prizes.map((prize, index) => {
    const start = (360 / prizes.length) * index;
    const end = (360 / prizes.length) * (index + 1);
    return `${prize.color} ${start}deg ${end}deg`;
  }).join(', ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        {!wonPrize ? (
          <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-3xl p-6 shadow-2xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Spin To Win</h2>
              <p className="text-sm text-gray-300">Spin the wheel to grab exclusive assured rewards</p>
            </div>

            <div className="relative w-72 h-72 mx-auto mb-6">
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-yellow-400" />
              </div>

              <div
                ref={wheelRef}
                className="relative w-full h-full rounded-full shadow-2xl transition-transform duration-[4000ms] ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  background: `conic-gradient(from 0deg, ${gradientStops})`,
                }}
              >
                <div className="absolute inset-0 rounded-full border-8 border-purple-300" />
                
                {prizes.map((prize, index) => {
                  const segmentAngle = 360 / prizes.length;
                  const angle = segmentAngle * index;
                  const offset = segmentAngle / 2;
                  
                  return (
                    <div
                      key={prize.id}
                      className="absolute inset-0"
                      style={{
                        transform: `rotate(${angle + offset}deg)`,
                        // Default transform-origin is center (50% 50%), which is correct for inset-0
                      }}
                    >
                      <div 
                        className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center"
                        style={{
                           // top-4 adds spacing from the outer edge (rim)
                           width: '60px',
                        }}
                      >
                        <span className="text-2xl mb-1 filter drop-shadow-md">{prize.icon}</span>
                        <span className="text-[9px] text-white font-bold text-center leading-[10px] break-words drop-shadow-md">
                          {prize.label}
                        </span>
                      </div>
                    </div>
                  );
                })}

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg z-10">
                  <Gift className="w-6 h-6 text-purple-900" />
                </div>
              </div>
            </div>

            <Button
              onClick={spinWheel}
              disabled={isSpinning}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-6 rounded-xl text-lg shadow-lg"
            >
              {isSpinning ? 'Spinning...' : 'Spin now'}
            </Button>
          </div>
        ) : (
          <WinPopup prize={wonPrize} onClose={onClose} />
        )}
      </div>
    </div>
  );
}

function WinPopup({ prize, onClose }: { prize: Prize; onClose: () => void }) {
  return (
    <div className="relative bg-gradient-to-b from-purple-600 to-purple-800 rounded-3xl p-8 shadow-2xl text-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 hover:text-white"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Spin To Win</h2>
        <p className="text-sm text-purple-200">Spin the wheel to grab exclusive assured rewards</p>
      </div>

      <div className="bg-white rounded-2xl p-8 mb-6">
        <div className="text-xs font-semibold text-purple-600 mb-2">UNIVEST</div>
        <div className="text-5xl mb-4">{prize.icon}</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{prize.label}</h3>
        <p className="text-sm text-gray-600 mb-4">on Univest Pro Subscription</p>
        <p className="text-xs text-gray-500">No minimum spends</p>
        
        <div className="mt-6 border-2 border-dashed border-purple-300 rounded-lg py-3">
          <p className="text-sm font-semibold text-purple-600">NO CODE NEEDED</p>
          <p className="text-xs text-gray-500 mt-1">Know more to claim</p>
        </div>
      </div>

      <Button
        onClick={onClose}
        className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-6 rounded-xl text-lg shadow-lg"
      >
        🎁 Claim now
      </Button>
    </div>
  );
}
