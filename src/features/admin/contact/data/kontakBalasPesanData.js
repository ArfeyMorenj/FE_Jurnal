// Dummy data untuk detail pesan (nanti dari backend)
export const getOriginalMessageDetail = (originalMessage) => {
  return {
    ...originalMessage,
    subject: "Saran Lorem Ipsum",
    fullMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper, mauris vel placerat egestas, erat diam congue tellus, ut tincidunt sem sem quis metus. Donec condimentum enim in lectus elementum, nec commodo dui faucibus. Aenean congue velit ac quam hendrerit sagittis. Pellentesque venenatis ut augue a efficitur. Sed ullamcorper, velit ac porta consequat, neque turpis egestas ipsum, sit amet tempor orci nibh vitae ligula. Integer lacinia sagittis augue, vel aliquam eros condimentum ac. Etiam finibus felis quis luctus rhoncus. Nullam vestibulum sapien a lectus dapibus dapibus. Curabitur eget eros turpis. Praesent scelerisque mi a erat egestas tristique. Donec pharetra nunc at dolor lobortis, vel condimentum tortor elementum. Fusce ante dolor, iaculis nec ex non, congue interdum dolor.",
    sentDate: "8 Nov 2025, 08.39",
    daysAgo: "4 hari yang lalu"
  };
};

// Dummy reply data (nanti dari backend)
export const existingReplies = [
  {
    id: 1,
    senderName: "Albus Dumbledore",
    senderEmail: "albusdumbledore@gmail.com",
    message: "Oke.",
    sentDate: "8 Nov 2025, 08.39",
    daysAgo: "4 hari yang lalu",
    avatar: "https://i.pravatar.cc/150?img=9"
  }
];

// Current user (admin) data
export const currentUser = {
  name: "Albus Dumbledore",
  email: "albusdumbledore@gmail.com",
  avatar: "https://i.pravatar.cc/150?img=9"
};

