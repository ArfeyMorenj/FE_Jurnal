let globalAvatarColor = null;

export const getGlobalColor = () => {
  if (!globalAvatarColor) {
    const colors = ["#10bd9d", "#3498db", "#9b59b6", "#e67e22", "#e74c3c"];
    globalAvatarColor = colors[Math.floor(Math.random() * colors.length)];
  }
  return globalAvatarColor;
};

export const getInitials = (name, email) => {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
  if (email) return email[0].toUpperCase();
  return "?";
};
