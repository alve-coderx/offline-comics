export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "GMT", // Set your desired time zone here
  };
  return new Date(dateString).toLocaleString(undefined, options);
};
