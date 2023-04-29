import { useEffect, useRef, useState } from "react";

export const usePluginEnter: UToolsApi["onPluginEnter"] = (callback) => {
  const fnRef = useRef(callback);

  fnRef.current = callback;

  useEffect(() => {
    utools.onPluginEnter(fnRef.current);
  }, []);
};

export const usePluginOut: UToolsApi["onPluginOut"] = (callback) => {
  const fnRef = useRef(callback);

  fnRef.current = callback;

  useEffect(() => {
    utools.onPluginOut(fnRef.current);
  }, []);
};

type Nullable<T> = {
  [K in keyof T]: T[K] | undefined;
};
type PluginEnterFn<T = any> = (
  ...args: Nullable<Parameters<Parameters<UToolsApi["onPluginEnter"]>[0]>>
) => T;

export const usePluginEnterFn = <T>(
  callback: PluginEnterFn<T>,
  options?: {
    defaultValue?: T;
    deps?: unknown[];
  }
): T | undefined => {
  const [retValue, setRetValue] = useState<T | undefined>(
    options?.defaultValue
  );
  const [_, setEnterTime] = useState(() => Date.now());
  const fnRef = useRef<PluginEnterFn<T | void>>(() => {});

  fnRef.current = function (...args) {
    const ret = callback.call(this, ...args);
    setRetValue(ret);
    return ret;
  };

  useEffect(() => {
    utools.onPluginEnter(() => setEnterTime(Date.now()));
  }, []);

  useEffect(() => {
    fnRef.current(undefined);
  }, options?.deps);

  return retValue;
};
