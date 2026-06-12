export const ORDER_TIMEOUT_MINUTES = 30;

export interface OrderTimeoutResult {
  isTimeout: boolean;
  remainingSeconds: number;
}

export const checkOrderTimeout = (createTime: string): OrderTimeoutResult => {
  const createTimestamp = new Date(createTime).getTime();
  const now = Date.now();
  const timeoutMs = ORDER_TIMEOUT_MINUTES * 60 * 1000;
  const elapsed = now - createTimestamp;
  const remainingMs = timeoutMs - elapsed;

  if (remainingMs <= 0) {
    return {
      isTimeout: true,
      remainingSeconds: 0
    };
  }

  return {
    isTimeout: false,
    remainingSeconds: Math.ceil(remainingMs / 1000)
  };
};

export const isOrderPayable = (status: string, createTime: string): boolean => {
  if (status !== 'pending') return false;
  const result = checkOrderTimeout(createTime);
  return !result.isTimeout;
};
