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
    utools.onPluginOut(fnRef.current)
  }, [])
}

type PluginEnterFn<T = any> = (...args: Parameters<Parameters<UToolsApi["onPluginEnter"]>[0]>) => T


export const usePluginEnterFn= <T>(callback: PluginEnterFn<T>): T | undefined => {
    const [retValue, setRetValue] = useState<T>()
    const fnRef = useRef<PluginEnterFn<T>>();
  
    fnRef.current = function (...args) {
        const ret = callback.call(this, ...args)
        setRetValue(ret)
        return ret
    }
  
    useEffect(() => {
      utools.onPluginEnter(fnRef.current!);
    }, []);

    return retValue
  };
  