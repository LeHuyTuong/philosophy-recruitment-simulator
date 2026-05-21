export function maskSessionId(value: string | null | undefined): string {
  if (!value) return 'anonymous';
  if (value.length <= 8) return `${value.slice(0, 2)}...${value.slice(-2)}`;
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}
