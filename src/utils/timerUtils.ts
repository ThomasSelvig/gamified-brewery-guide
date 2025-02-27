// Format time in MM:SS
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const calculateEstimatedABV = (originalGravity: number, finalGravity: number): string => {
  return ((originalGravity - finalGravity) * 131.25).toFixed(1);
};