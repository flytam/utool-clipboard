import { useMemo, useState } from "react";
import { useMemoizedFn } from "ahooks";
import { decrypt, encrypt } from "../utils/crypto";

interface Options<T> {
  defaultValue?: T;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

const defaultOptions: Options<any> = {
  defaultValue: undefined,
  serializer: (v) => encrypt(JSON.stringify(v)),
  deserializer: (v) => JSON.parse(decrypt(v)),
};

const { readFileSync, writeFileSync, existsSync } = window.utoolClipboard;

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

  const dbPath = useMemo(() => {
    return window.utoolClipboard.path.join(
      window.utoolClipboard.dirPath,
      `${key}.json`
    );
  }, [key, window.utoolClipboard.dirPath]);

  const [state, setState] = useState<T>(() => {
    if (!existsSync(dbPath)) {
      if (options.defaultValue) {
        writeFileSync(dbPath, options.serializer!(options.defaultValue), {
          flag: "wx",
        });
      }

      return options.defaultValue as T;
    } else {
      const v = options.deserializer!(
        readFileSync(dbPath, { encoding: "utf-8" })
      );
      return v;
    }
  });

  const setDbValue = useMemoizedFn((v: T | ((previousState?: T) => T)) => {
    writeFileSync(
      dbPath,
      options.serializer!(
        typeof v === "function" ? (v as (previousState?: T) => T)(state) : v
      )
    );
    setState(v);
  });

  return [state, setDbValue];
};
