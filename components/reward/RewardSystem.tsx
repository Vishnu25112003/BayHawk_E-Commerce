import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Wallet, Gift, Timer, Percent, Bell } from 'lucide-react';
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
    <div className="bg-[#f8f9fa] py-8 px-4 md:px-8 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Reward Center</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-gray-500 text-sm font-medium">Claim your exclusive rewards</p>
            </div>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none bg-white p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-4">
              <div className="bg-amber-50 p-3 rounded-2xl text-amber-600">
                <Wallet size={24} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Balance</p>
                <p className="text-xl font-black text-gray-800">₹{walletBalance}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-[30px] text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
                <Percent size={32} className="mb-4 opacity-40" />
                <h3 className="font-bold mb-2">Wallet Usage Rules</h3>
                <ul className="text-xs space-y-2 opacity-90">
                    <li>• Max ₹100 applied per order.</li>
                    <li>• 10% of cart value limit.</li>
                    <li>• 14 days credit validity.</li>
                </ul>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm">
             <h3 className="font-bold mb-2 text-gray-800 flex items-center gap-2">
                <Timer size={20} className="text-blue-500" /> Card Validity
             </h3>
             <p className="text-sm text-gray-500">Unscratched cards are valid for 7 days. Be sure to scratch them before they expire!</p>
          </div>
        </div>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {collectedRewards.length === 0 ? (
                <div className="col-span-full py-20 flex flex-col items-center text-gray-300">
                  <Gift size={64} strokeWidth={1} className="mb-4" />
                  <p className="font-bold">No rewards yet. Start shopping!</p>
                </div>
              ) : (
                collectedRewards.map((reward) => (
                  <motion.div 
                    key={reward.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <ScratchCard
                      coverImage={reward.type === 'Coupon' ? IMAGES.OFFER_BEFORE : IMAGES.PRICE_BEFORE}
                      revealImage={reward.type === 'Coupon' ? IMAGES.OFFER_AFTER : IMAGES.PRICE_AFTER}
                      onComplete={() => handleScratchComplete(reward)}
                      className={reward.isScratched ? 'opacity-40 pointer-events-none' : ''}
                    >
                        <div className="flex flex-col items-center justify-center text-center p-4">
                            <span className="text-2xl font-black text-[#0A4D8C] drop-shadow-sm font-mono">
                                {reward.value}
                            </span>
                        </div>
                    </ScratchCard>
                    
                    <div className="mt-4 w-full bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
                        <p className="text-xs font-black text-gray-800 uppercase tracking-tighter">{reward.title}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{reward.description}</p>
                        <div className="flex items-center gap-1 mt-2 text-[9px] text-gray-400 font-bold">
                            <Timer size={10} />
                            <span>Expires: {new Date(reward.expiryDate).toLocaleDateString()}</span>
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
              className="fixed bottom-10 left-1/2 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-[100] border border-white/10"
            >
              <Bell size={18} className="text-yellow-400 animate-bounce" />
              <span className="text-xs font-bold tracking-wide">{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RewardSystem;
