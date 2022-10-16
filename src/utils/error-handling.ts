import { STATUS_CODES } from "http";

const errorMessages = [
  "Maxwell hit us with his silver hammer.",
  "Our servers gently weep.",
  "Imagine there's no errors...",
  "Help!",
];

export const getRandomMessage = () =>
  errorMessages[Math.floor(Math.random() * errorMessages.length)];

export const getStatusCodeDescription = (statusCode: number) => {
  switch (statusCode) {
    case 400:
      return "There was an issue with your request.";
    case 404:
      return "We couldn't find the page you're looking for.";
    case 500:
      return "We ran into an unexpected error.";
    default:
      return STATUS_CODES[statusCode]
        ? `Error: ${STATUS_CODES[statusCode]}.`
        : "We ran into an unexpected error.";
  }
};
