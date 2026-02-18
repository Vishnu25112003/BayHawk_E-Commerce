import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Timer, Bell } from 'lucide-react';
import ScratchCard from './ScratchCard';
import { useStore, Reward } from '@/lib/store';

const RewardSystem: React.FC = () => {
  const walletBalance = useStore((state) => state.walletBalance);
  const addWalletBalance = useStore((state) => state.addWalletBalance);
  const collectedRewards = useStore((state) => state.collectedRewards);
  const updateReward = useStore((state) => state.updateReward);
  const orders = useStore((state) => state.orders);
  const addReward = useStore((state) => state.addReward);
  const processedOrderIds = useStore((state) => state.processedOrderIds);
  const markOrderAsProcessed = useStore((state) => state.markOrderAsProcessed);
  const lastDailyClaim = useStore((state) => state.lastDailyClaim);
  const setLastDailyClaim = useStore((state) => state.setLastDailyClaim);
  
  const [notification, setNotification] = useState<string | null>(null);

  const IMAGES = {
    OFFER_BEFORE: '/images/offer-scratch.png',
    OFFER_AFTER: '/images/offer-scratch-coupon.png',
    PRICE_BEFORE: '/images/price-scratch.png',
    PRICE_AFTER: '/images/price-scratch-amount.png'
  };

  const WEIGHTS = [30, 15, 15, 20, 20];

  const getWeightedValue = (values: string[]) => {
    const random = Math.random() * 100;
    let cumulativeWeight = 0;
    for (let i = 0; i < WEIGHTS.length; i++) {
      cumulativeWeight += WEIGHTS[i];
      if (random <= cumulativeWeight) return values[i];
    }
    return values[values.length - 1];
  };

  const isFestivalDay = () => {
    const today = new Date();
    const mmdd = `${today.getMonth() + 1}-${today.getDate()}`;
    const festivals: Record<string, string> = {
      '1-1': 'New Year',
      '1-14': 'Pongal',
      '1-26': 'Republic Day',
      '8-15': 'Independence Day',
      '5-1': 'May Day',
      '12-25': 'Christmas'
    };
    return festivals[mmdd] || null;
  };

  useEffect(() => {
    const unprocessedOrders = orders.filter(o => !processedOrderIds.includes(o.id));
    
    unprocessedOrders.forEach(order => {
      let primaryValues: string[] = [];
      if (order.total >= 1500) primaryValues = ['₹8', '₹10', '₹12', '₹15', '₹20'];
      else if (order.total >= 650) primaryValues = ['₹5', '₹7', '₹8', '₹12', '₹15'];
      else if (order.total >= 350) primaryValues = ['₹5', '₹7', '₹8', '₹10', '₹12'];

      if (primaryValues.length > 0) {
        const val = getWeightedValue(primaryValues);
        addReward({
          id: `primary-${order.id}`,
          icon: 'Gift',
          title: 'Primary Reward',
          points: '0',
          description: `Order Reward for ₹${order.total}`,
          isScratched: false,
          type: 'Cashback',
          value: val,
          rewardType: 'Primary',
          expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        });
      }

      const orderCountThisMonth = orders.filter(o => {
        const oDate = new Date(o.date);
        const now = new Date();
        return oDate.getMonth() === now.getMonth() && oDate.getFullYear() === now.getFullYear();
      }).length;

      if (orderCountThisMonth > 0 && orderCountThisMonth % 5 === 0) {
        const bonusVal = getWeightedValue(['₹12', '₹15', '₹18', '₹20', '₹25']);
        addReward({
          id: `bonus-${order.id}`,
          icon: 'Trophy',
          title: 'Bonus Reward',
          points: '0',
          description: '5th Order Monthly Bonus!',
          isScratched: false,
          type: 'Cashback',
          value: bonusVal,
          rewardType: 'Bonus',
          expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        });
        setNotification("🎉 Bonus Scratch Card Earned!");
        setTimeout(() => setNotification(null), 5000);
      } else {
        const remaining = 5 - (orderCountThisMonth % 5);
        if (remaining <= 2) {
          setNotification(`You're ${remaining} orders away from Bonus Scratch..!`);
          setTimeout(() => setNotification(null), 5000);
        }
      }

      markOrderAsProcessed(order.id);
    });

    const todayStr = new Date().toDateString();
    if (lastDailyClaim !== todayStr) {
      const festivalName = isFestivalDay();
      if (festivalName) {
        const festVal = getWeightedValue(['₹8', '₹10', '₹15', '₹18', '₹20']);
        addReward({
          id: `seasonal-${todayStr}`,
          icon: 'Star',
          title: `${festivalName} Special`,
          points: '0',
          description: `Happy ${festivalName}! Here is your festival reward.`,
          isScratched: false,
          type: 'Cashback',
          value: festVal,
          rewardType: 'Seasonal',
          expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        });
      } else {
        const dailyVal = getWeightedValue(['₹BLNT', '₹2', '₹4', '₹7', '₹10']);
        addReward({
          id: `daily-${todayStr}`,
          icon: 'Timer',
          title: 'Daily Reward',
          points: '0',
          description: 'Claim your daily surprise!',
          isScratched: false,
          type: 'Cashback',
          value: dailyVal,
          rewardType: 'Daily',
          expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
      setLastDailyClaim(todayStr);
    }
  }, [orders, processedOrderIds]);

  const handleScratchComplete = (reward: Reward) => {
    if (reward.isScratched) return;

    updateReward(reward.id, { isScratched: true });

    if (reward.type === 'Cashback' && reward.value !== '₹BLNT') {
      const amount = parseInt(reward.value.replace('₹', ''));
      if (!isNaN(amount)) {
        addWalletBalance(amount);
      }
    }

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF4500']
    });

    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  return (
    <div className="bg-[#f8f9fa] py-4 md:py-8 px-3 md:px-8 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto">
        {/* Reward Image with Balance */}
        <div className="relative mb-6 md:mb-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl">
          <img 
            src="/images/rewardpage.png" 
            alt="Rewards" 
            className="w-full h-auto object-cover"
          />
          <div className="absolute bottom-2 left-2 md:bottom-6 md:left-6">
            <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 md:px-6 md:py-3 rounded-lg md:rounded-2xl shadow-lg border border-white/50">
              <p className="text-[9px] md:text-sm text-gray-600 font-semibold">Wallet Balance</p>
              <p className="text-base md:text-3xl font-black text-gray-900">₹{walletBalance}</p>
            </div>
          </div>
        </div>

        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <AnimatePresence mode="popLayout">
              {collectedRewards.length === 0 ? (
                <div className="col-span-full py-12 md:py-20 flex flex-col items-center text-gray-300">
                  <Gift size={48} strokeWidth={1} className="mb-3 md:mb-4 md:w-16 md:h-16" />
                  <p className="font-bold text-sm md:text-base">No rewards yet. Start shopping!</p>
                </div>
              ) : (
                collectedRewards.map((reward) => (
                  <motion.div 
                    key={reward.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col"
                  >
                    <ScratchCard
                      coverImage={reward.type === 'Coupon' ? IMAGES.OFFER_BEFORE : IMAGES.PRICE_BEFORE}
                      revealImage={reward.type === 'Coupon' ? IMAGES.OFFER_AFTER : IMAGES.PRICE_AFTER}
                      onComplete={() => handleScratchComplete(reward)}
                      className={reward.isScratched ? 'opacity-40 pointer-events-none' : ''}
                    >
                        <div className="flex flex-col items-center justify-center text-center p-3 md:p-4">
                            <span className="text-xl md:text-2xl font-black text-[#0A4D8C] drop-shadow-sm font-mono">
                                {reward.value}
                            </span>
                        </div>
                    </ScratchCard>
                    
                    <div className="w-full bg-white p-2 md:p-3 rounded-b-xl shadow-sm border border-t-0 border-gray-200">
                        <p className="text-[10px] md:text-xs font-bold text-gray-800 uppercase tracking-tight truncate">{reward.title}</p>
                        <p className="text-[8px] md:text-[9px] text-gray-500 mt-0.5 truncate">{reward.description}</p>
                        <div className="flex items-center gap-1 mt-1 text-[7px] md:text-[8px] text-gray-400 font-semibold">
                            <Timer size={8} className="md:w-[9px] md:h-[9px]" />
                            <span>Exp: {new Date(reward.expiryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                        </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </main>

        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ opacity: 0, y: 50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 50, x: '-50%' }}
              className="fixed bottom-6 md:bottom-10 left-1/2 bg-gray-900 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl shadow-2xl flex items-center gap-2 md:gap-3 z-[100] border border-white/10 max-w-[90vw]"
            >
              <Bell size={16} className="md:w-[18px] md:h-[18px] text-yellow-400 animate-bounce" />
              <span className="text-[10px] md:text-xs font-bold tracking-wide">{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RewardSystem;
