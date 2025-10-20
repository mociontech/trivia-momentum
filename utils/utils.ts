export function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor(ms % 1000);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}.${
    milliseconds < 100 ? (milliseconds < 10 ? "00" : "0") : ""
  }${milliseconds}`;
}
