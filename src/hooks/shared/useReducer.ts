import { ReducerAction, Reducer, useCallback, useEffect, useRef } from 'react';
import useObjectState, { InitialValue, ObjectControl } from './useObjectState';

// useReducer with useObjectState as state
export default function useReducer<T, R extends Reducer<T, any>>(
  reducer: R,
  initialValue: InitialValue<T>
): [(key?: any) => any, React.Dispatch<ReducerAction<R>>, ObjectControl<T>] {
  const _initialValue = initialValue instanceof Function ? initialValue() : initialValue;
  const [getState, setState, control] = useObjectState(_initialValue);

  // use a reducer to the ref to avoid the dispatch function to change
  const reducerRef = useRef(reducer);

  useEffect(() => {
    reducerRef.current = reducer;
  }, [reducer]);

  const dispatch = useCallback(
    (action: ReducerAction<R>) => {
      const newState = reducerRef.current(getState(), action);
      setState(newState);
    },
    [getState, setState]
  );

  return [getState, dispatch, control];
}
