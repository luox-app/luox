import { calculate } from "../calculations";

// eslint-disable-next-line no-restricted-globals
self.addEventListener("message", (event) => {
  if (!event) return;
  // eslint-disable-next-line no-console
  console.log("worker received a message.");
  const res = calculate(event.data[0], event.data[1]);

  // eslint-disable-next-line no-restricted-globals
  self.postMessage(res);
});
