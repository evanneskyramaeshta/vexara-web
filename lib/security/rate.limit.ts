const ipRequestLog = new Map<string, number[]>();

export function checkRateLimit(
  identifier: string,
  limit = 5,
  windowMs = 10 * 60 * 1000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = ipRequestLog.get(identifier) ?? [];
  const validTimestamps = timestamps.filter((time) => now - time < windowMs);

  if (validTimestamps.length >= limit) {
    ipRequestLog.set(identifier, validTimestamps);
    return { allowed: false, remaining: 0 };
  }

  validTimestamps.push(now);
  ipRequestLog.set(identifier, validTimestamps);

  return { allowed: true, remaining: limit - validTimestamps.length };
}