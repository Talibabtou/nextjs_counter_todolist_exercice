'use client';

import { useCounter } from '@/hooks/useCounter';
import { useNotifications } from '@/contexts/NotificationContext';
import { useState, useEffect } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import CounterEffect from '@/components/common/CounterEffect';

export default function Counter() {
  const { count, increment, decrement, reset, incrementByAmount } = useCounter();
  const { addNotification } = useNotifications();
  const [inputValue, setInputValue] = useState('5');
  const [effectTrigger, setEffectTrigger] = useState(false);
  const [lastMilestone, setLastMilestone] = useState(0);

  // Check for milestone achievements
  useEffect(() => {
    const currentMilestone = Math.floor(count / 1000) * 1000;
    if (currentMilestone > lastMilestone && currentMilestone > 0) {
      addNotification({
        type: 'success',
        title: 'Milestone Reached! 🎉',
        message: `Congratulations! You've reached ${currentMilestone.toLocaleString()}!`,
        duration: 5000,
      });
      setLastMilestone(currentMilestone);
    }
  }, [count, lastMilestone, addNotification]);

  const handleIncrement = () => {
    increment();
    setEffectTrigger(true);
    setTimeout(() => setEffectTrigger(false), 100);
  };

  const handleIncrementByAmount = () => {
    const amount = inputValue === '' ? 0 : Number(inputValue);
    incrementByAmount(amount);
    setEffectTrigger(true);
    setTimeout(() => setEffectTrigger(false), 100);
  };

  return (
    <div className="flex justify-center">
      <div className="card w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Counter Component
        </h2>
        <p className="text-secondary mb-3">
          Practice Redux state management with a simple counter.
        </p>
        
        <div className="text-center">
          <CounterEffect trigger={effectTrigger} value={count} />
          
          <div className="flex gap-2 justify-center mt-4">
            <Button onClick={decrement} variant="secondary">
              Decrement
            </Button>
            <Button onClick={reset} variant="danger">
              Reset
            </Button>
            <Button onClick={handleIncrement} variant="primary">
              Increment
            </Button>
          </div>
          
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-1/4">
              <Input
                value={inputValue}
                onChange={setInputValue}
                variant="number"
              />
            </div>
            <Button onClick={handleIncrementByAmount} variant="primary">
              Increment by Amount
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
