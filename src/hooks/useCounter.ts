import { useAppSelector, useAppDispatch } from '@/store/store';
import { increment, decrement, reset, incrementByAmount } from '@/reducers/counterReducer';

export function useCounter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const incrementCounter = () => dispatch(increment());
  const decrementCounter = () => dispatch(decrement());
  const resetCounter = () => dispatch(reset());
  const incrementByAmountCounter = (amount: number) => dispatch(incrementByAmount(amount));

  return {
    count,
    increment: incrementCounter,
    decrement: decrementCounter,
    reset: resetCounter,
    incrementByAmount: incrementByAmountCounter,
  };
}
