export const accountColors = [
  '#8438FF', 
  '#38CFFF', 
  '#FF8000',
  '#FF1E1E', 
  '#FF2090', 
  '#49FFD8',
];

export function getAccountColor(accountNumber: string) {
  let hash = 0;
  for (let i = 0; i < accountNumber.length; i++) {
    hash = accountNumber.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % accountColors.length;
  return accountColors[index];
} 