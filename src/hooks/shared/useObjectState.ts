import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { EventEmitter } from 'events';
import _ from 'lodash';

type InitialValue<T> = T | (() => T);

export type ObjectControl<T> = MutableRefObject<{
  _state: T;
  _emitter: EventEmitter;
}>;

const OBJECT_UPDATE = 'OBJECT_UPDATE';

// State object, supports a selector hook
export default function useObjectState<T>(
  initialValue: InitialValue<T>
): [(key?: any) => T | any, (newValue: T) => void, ObjectControl<T>] {
  const _initialValue = initialValue instanceof Function ? initialValue() : initialValue;
  const control = useRef({ _state: _initialValue, _emitter: new EventEmitter() });

  const getState = useCallback((key?: any): T | any => {
    const state = control.current._state;

    return _.get(state, key, state);
  }, []);

  const setState = useCallback(
    (newValue: Partial<T>) => {
      control.current._state = { ...getState(), ...newValue };

      control.current._emitter.emit(OBJECT_UPDATE, control.current._state);
    },
    [getState]
  );

  return [getState, setState, control];
}

function defaultCompare<T>(prevValue: T, value: T) {
  return prevValue === value;
}

export function useObjectSelector<T, Z>(
  control: MutableRefObject<{
    _state: Z;
    _emitter: EventEmitter;
  }>,
  selector: (obj: Z) => T,
  compareFunction?: (prevValue: T, value: T) => boolean
) {
  const [state, setState] = useState(() => selector(control.current._state));
  const isEqual = useMemo(() => compareFunction || defaultCompare, [compareFunction]);

  useEffect(() => {
    const { current } = control;

    const updateState = (obj: Z) => {
      const newState = selector(obj);
      setState((prevState) => {
        if (!isEqual(prevState, newState)) {
          return newState;
        }

        return prevState;
      });
    };
    current._emitter.on(OBJECT_UPDATE, updateState);

    return () => {
      current._emitter.off(OBJECT_UPDATE, updateState);
    };
  }, [state, control, selector, isEqual]);

  return state;
}
