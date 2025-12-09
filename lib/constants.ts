export interface Event {
  title: string;
  image: string;
  date?: string;
  location?: string;
  description?: string;
  time?: string;
}

export const events: Event[] = [
  {
    title: "CES 2026",
    image: "/images/event1.png",
    date: "January 7-10, 2026",
    location: "Las Vegas, NV",
    description:
      "The world's largest tech show featuring innovations in consumer electronics, AI, and emerging technologies.",
    time: "9:00 AM",
  },
  {
    title: "Google I/O 2026",
    image: "/images/event2.png",
    date: "May 12-14, 2026",
    location: "Mountain View, CA",
    description:
      "Google's annual developer conference showcasing the latest in Android, web, cloud, and AI technologies.",
    time: "10:00 AM",
  },
  {
    title: "Microsoft Build 2026",
    image: "/images/event3.png",
    date: "May 19-21, 2026",
    location: "Seattle, WA",
    description:
      "A conference for developers and IT professionals to learn about Microsoft's latest tools, platforms, and services.",
    time: "9:00 AM",
  },
  {
    title: "Apple WWDC 2026",
    image: "/images/event4.png",
    date: "June 9-13, 2026",
    location: "Online",
    description:
      "Apple's Worldwide Developers Conference featuring new software announcements, developer tools, and workshops.",
    time: "10:00 AM",
  },
  {
    title: "React Conf 2026",
    image: "/images/event5.png",
    date: "March 20-21, 2026",
    location: "Online",
    description:
      "A conference dedicated to React, featuring talks from the React team and community leaders.",
    time: "9:00 AM",
  },
  {
    title: "Node.js Interactive 2026",
    image: "/images/event6.png",
    date: "November 16-17, 2026",
    location: "Austin, TX",
    description:
      "A conference focused on Node.js, covering best practices, performance, and the latest ecosystem developments.",
    time: "9:00 AM",
  },
  {
    title: "Hack the Planet Hackathon",
    image: "/images/event-full.png",
    date: "February 15-16, 2026",
    location: "San Francisco, CA",
    description:
      "A 48-hour hackathon for developers to build innovative solutions using open-source technologies.",
    time: "6:00 PM",
  },
];
