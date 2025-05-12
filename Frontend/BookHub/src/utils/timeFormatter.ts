export const formatDate = (dateString: string | number) => {
  try {
    const timestamp =
      typeof dateString === "string"
        ? Number(dateString)
        : (dateString as number);

    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return "Invalid date";
    }

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Date format error";
  }
};
