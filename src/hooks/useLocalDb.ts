import { useMemo, useState } from "react";
import { useMemoizedFn } from "ahooks";

interface Options<T> {
  defaultValue?: T;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

const defaultOptions: Options<any> = {
  defaultValue: undefined,
  serializer: (v) => "",
  deserializer: (v) => {},
};

export const useLocalDb = <T = unknown>(
  key: string,
  options: Options<T> = {}
): [
  dbValue: T,
  setDbValue: (value: T | ((previousState?: T) => T)) => void
] => {
  options = {
    ...defaultOptions,
    ...options,
  };

  const [state, setDbValue] = useState<any>([]);

  return [state, setDbValue];
};
