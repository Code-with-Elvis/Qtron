type Category = {
  name: string;
  subcategories: string[];
};

export const categories: Category[] = [
  {
    name: "Mobile Phones & Tablets",
    subcategories: [
      "Smartphones",
      "Feature Phones",
      "Tablets",
      "Phone Accessories",
      "Phone Cases & Covers",
      "Screen Protectors",
      "Chargers & Cables",
      "Power Banks",
      "Headphones & Earbuds",
    ],
  },
  {
    name: "Computers & Laptops",
    subcategories: [
      "Laptops",
      "Desktop Computers",
      "Gaming PCs",
      "Monitors",
      "Keyboards & Mice",
      "External Hard Drives",
      "USB Drives",
      "Laptop Accessories",
      "Webcams",
      "Laptop Bags",
    ],
  },
  {
    name: "Computer Components",
    subcategories: [
      "Processors (CPUs)",
      "Graphics Cards (GPUs)",
      "Motherboards",
      "RAM Memory",
      "Storage (SSD/HDD)",
      "Power Supplies",
      "Computer Cases",
      "Cooling Systems",
      "Sound Cards",
    ],
  },
  {
    name: "Audio & Sound",
    subcategories: [
      "Headphones",
      "Earbuds & In-Ear",
      "Speakers",
      "Bluetooth Speakers",
      "Home Theater Systems",
      "Soundbars",
      "Amplifiers",
      "Microphones",
      "DJ Equipment",
      "Musical Instruments (Electronic)",
    ],
  },
  {
    name: "Cameras & Photography",
    subcategories: [
      "Digital Cameras",
      "DSLR Cameras",
      "Mirrorless Cameras",
      "Action Cameras",
      "Camera Lenses",
      "Tripods & Stabilizers",
      "Camera Bags",
      "Memory Cards",
      "Camera Accessories",
      "Drones with Cameras",
    ],
  },
  {
    name: "Gaming",
    subcategories: [
      "Gaming Consoles",
      "PlayStation",
      "Xbox",
      "Nintendo Switch",
      "Gaming Controllers",
      "VR Headsets",
      "Gaming Headsets",
      "Gaming Keyboards",
      "Gaming Mice",
      "Gaming Chairs",
    ],
  },
  {
    name: "TVs & Home Entertainment",
    subcategories: [
      "Smart TVs",
      "LED/LCD TVs",
      "OLED TVs",
      "Projectors",
      "TV Mounts & Stands",
      "Streaming Devices",
      "DVD/Blu-ray Players",
      "Home Theater Systems",
      "TV Accessories",
    ],
  },
  {
    name: "Wearable Technology",
    subcategories: [
      "Smartwatches",
      "Fitness Trackers",
      "Smart Bands",
      "VR Headsets",
      "Smart Glasses",
      "Health Monitors",
      "Watch Bands & Straps",
    ],
  },
  {
    name: "Smart Home & IoT",
    subcategories: [
      "Smart Speakers",
      "Smart Lights",
      "Smart Plugs",
      "Smart Thermostats",
      "Security Cameras",
      "Video Doorbells",
      "Smart Locks",
      "Smart Switches",
      "Home Automation Hubs",
    ],
  },
  {
    name: "Networking & WiFi",
    subcategories: [
      "Routers",
      "WiFi Extenders",
      "Mesh WiFi Systems",
      "Modems",
      "Network Switches",
      "Ethernet Cables",
      "Network Adapters",
    ],
  },
  {
    name: "Printers & Scanners",
    subcategories: [
      "Inkjet Printers",
      "Laser Printers",
      "3D Printers",
      "Scanners",
      "All-in-One Printers",
      "Printer Ink & Toner",
      "Photo Printers",
    ],
  },
  {
    name: "Home Appliances (Electronic)",
    subcategories: [
      "Vacuum Cleaners (Robot)",
      "Air Purifiers",
      "Air Conditioners",
      "Fans",
      "Heaters",
      "Dehumidifiers",
      "Electric Kettles",
      "Coffee Makers",
    ],
  },
  {
    name: "Power & Batteries",
    subcategories: [
      "Power Banks",
      "UPS Systems",
      "Surge Protectors",
      "Extension Cords",
      "Rechargeable Batteries",
      "Battery Chargers",
      "Solar Chargers",
      "Wireless Chargers",
    ],
  },
  {
    name: "E-readers & Books",
    subcategories: ["E-readers", "E-reader Accessories", "E-reader Cases"],
  },
  {
    name: "Drones & RC Devices",
    subcategories: [
      "Camera Drones",
      "Racing Drones",
      "RC Cars",
      "RC Helicopters",
      "Drone Accessories",
      "Drone Batteries",
    ],
  },
  {
    name: "Office Electronics",
    subcategories: [
      "Calculators",
      "Label Makers",
      "Laminators",
      "Paper Shredders",
      "Presentation Pointers",
      "Electronic Whiteboards",
    ],
  },
  {
    name: "Car Electronics",
    subcategories: [
      "Car Stereos",
      "Dash Cams",
      "GPS Navigation",
      "Car Chargers",
      "Bluetooth Car Kits",
      "Backup Cameras",
      "Car Amplifiers",
    ],
  },
  {
    name: "Other Electronics",
    subcategories: [
      "Electric Scooters",
      "Hoverboards",
      "Metal Detectors",
      "Walkie Talkies",
      "Electronic Organizers",
      "Digital Clocks",
      "Weather Stations",
    ],
  },
];

export const languages = [
  {
    name: "English",
    label: "English",
    code: "en",
    image: "/US-flag.png",
  },
  {
    name: "Spanish",
    label: "Español",
    code: "es",
    image: "/Spain-flag.png",
  },
  {
    name: "French",
    label: "Français",
    code: "fr",
    image: "/France-flag.png",
  },
  {
    name: "German",
    label: "Deutsch",
    code: "de",
    image: "/German-flag.png",
  },
  {
    name: "Chinese",
    label: "中文",
    code: "zh",
    image: "/China-flag.png",
  },
  {
    name: "Swahili",
    label: "Kiswahili",
    code: "sw",
    image: "/Kenya-flag.png",
  },
  {
    name: "Indian",
    label: "हिन्दी",
    code: "hi",
    image: "/India-flag.png",
  },
];

export const themes = [
  {
    id: "theme-volt",
    label: "Volt",
    preview: "oklch(0.55 0.15 240)",
  },
  {
    id: "theme-neon",
    label: "Neon",
    preview: "oklch(0.75 0.2 135)",
  },
  {
    id: "theme-qtron",
    label: "Qtron",
    preview: "oklch(0.6 0.15 260)",
  },
  {
    id: "theme-carbon",
    label: "Carbon",
    preview: "oklch(0.78 0.18 200)",
  },
  {
    id: "theme-hyper",
    label: "Hyper",
    preview: "oklch(0.68 0.17 210)",
  },
  {
    id: "theme-solarcore",
    label: "Solarcore",
    preview: "oklch(0.75 0.2 70)",
  },
];

export const homeShortCutCategories = [
  {
    name: "Elevate Your Sound",
    products: [
      {
        id: 1,
        name: "Headphones",
        image: "/Headphones.png",
      },
      {
        id: 2,
        name: "Speakers",
        image: "/Speakers.png",
      },
      { id: 3, name: "Soundbars", image: "/Soundbars.png" },
      {
        id: 4,
        name: "Microphones",
        image: "/Microphones.png",
      },
    ],
  },
  {
    name: "Save on deals",
    products: [
      {
        id: 5,
        name: "Gaming",
        image: "/Gaming.png",
      },
      {
        id: 6,
        name: "Chargers",
        image: "/Chargers.png",
      },
      {
        id: 7,
        name: "Tablets",
        image: "/Tablets.png",
      },
      {
        id: 8,
        name: "Adapters",
        image: "/Adapters.png",
      },
    ],
  },
];

export const footerLinks = [
  {
    title: "About Qtron",
    content: [
      {
        label: "About Us",
        href: "#",
      },
      {
        label: "Careers",
        href: "#",
      },
      {
        label: "Locations",
        href: "#",
      },
      {
        label: "Blog",
        href: "#",
      },
      {
        label: "Customer Reviews",
        href: "#",
      },
    ],
  },
  {
    title: "Make Money with Us",
    content: [
      {
        label: "Sell on Qtron",
        href: "#",
      },
      {
        label: "Affiliate Program",
        href: "#",
      },
      {
        label: "Advertise Your Products",
        href: "#",
      },
      {
        label: "Participate in Research",
        href: "#",
      },
    ],
  },
  {
    title: "Customer Service",
    content: [
      {
        label: "Contact Us",
        href: "#",
      },
      {
        label: "Order Tracking",
        href: "#",
      },
      {
        label: "Returns",
        href: "#",
      },
      {
        label: "Shipping",
        href: "#",
      },
      {
        label: "FAQs",
        href: "#",
      },
    ],
  },

  {
    title: "Extra Information",
    content: [
      {
        label: "Privacy Policy",
        href: "#",
      },
      {
        label: "Terms of Service",
        href: "#",
      },
      {
        label: "Cookie Policy",
        href: "#",
      },
      {
        label: "Payment Methods",
        href: "#",
      },
      {
        label: "Sitemap",
        href: "#",
      },
    ],
  },
];
