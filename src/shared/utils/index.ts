import { CHAINS, TDC_API_URL, TDC_MAINNET_PATH } from "@/shared/constant";
import browser from "./browser";

const keyBy = (array: Record<string, any>, key: string) => (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});

const t = (name: string) => browser.i18n.getMessage(name);

const format = (str: string, ...args: any[]) => {
  return args.reduce((m, n) => m.replace("_s_", n), str);
};

export { t, format };

const chainsDict = keyBy(CHAINS, "serverId");
export const getChain = (chainId?: string) => {
  if (!chainId) {
    return null;
  }
  return chainsDict[chainId];
};

interface fetchProps extends RequestInit {
  method?: "POST" | "GET" | "PUT" | "DELETE";
  headers?: HeadersInit;
  path: string;
  params?: Record<string, string>;
  error?: boolean;
  json?: boolean;
}

export const fetchTDCMainnet = async <T>({ path, json = true, ...props }: fetchProps): Promise<T | undefined> => {
  const url = new URL(TDC_MAINNET_PATH.concat(path), TDC_API_URL);
  if (props.params) {
    Object.entries(props.params).forEach((v) => url.searchParams.set(...v));
  }
  const res = await fetch(url.toString(), { ...props });

  if (!json) return (await res.text()) as T;

  return await res.json();
};

export const excludeKeysFromObj = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keysToExtract: K[]
): Omit<T, K> => {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !keysToExtract.includes(k as K))) as Omit<T, K>;
};

export const pickKeysFromObj = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keysToPick: K[]
): Pick<T, K> => {
  return Object.fromEntries(Object.entries(obj).filter(([k]) => keysToPick.includes(k as K))) as Pick<T, K>;
};
