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
      "Wearable Accessories",
      "Smart Rings",
      "Analog Watches",
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
      "Microwaves",
      "Toasters",
      "Refrigerators",
      "Washing Machines",
      "Dryers",
      "Dishwashers",
      "Blenders",
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
    image: "/flags/US.png",
  },
  {
    name: "Spanish",
    label: "Español",
    code: "es",
    image: "/flags/Spain.png",
  },
  {
    name: "French",
    label: "Français",
    code: "fr",
    image: "/flags/France.png",
  },
  {
    name: "German",
    label: "Deutsch",
    code: "de",
    image: "/flags/Germany.png",
  },
  {
    name: "Chinese",
    label: "中文",
    code: "zh",
    image: "/flags/China.png",
  },
  {
    name: "Swahili",
    label: "Kiswahili",
    code: "sw",
    image: "/flags/Kenya.png",
  },
  {
    name: "Indian",
    label: "हिन्दी",
    code: "hi",
    image: "/flags/India.png",
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
        image: "/categories/Headphones.png",
        link: "/products?subcategory=headphones",
      },
      {
        id: 2,
        name: "Speakers",
        image: "/categories/Speakers.png",
        link: "/products?subcategory=speakers",
      },
      {
        id: 3,
        name: "Soundbars",
        image: "/categories/Soundbars.png",
        link: "/products?subcategory=soundbars",
      },
      {
        id: 4,
        name: "Microphones",
        image: "/categories/Microphones.png",
        link: "/products?subcategory=microphones",
      },
    ],
  },
  {
    name: "Save on deals",
    products: [
      {
        id: 5,
        name: "Gaming",
        image: "/categories/Gaming.png",
        link: "/products?category=gaming",
      },
      {
        id: 6,
        name: "Chargers",
        image: "/categories/Chargers.png",
        link: "/products?q=chargers",
      },
      {
        id: 7,
        name: "Tablets",
        image: "/categories/Tablets.png",
        link: "/products?q=tablets",
      },
      {
        id: 8,
        name: "Adapters",
        image: "/categories/Adapters.png",
        link: "/products?q=adapters",
      },
    ],
  },
];

export const homeExploreSubcategories = [
  {
    id: 1,
    name: "Analog Watches",
    image: "/categories/AnalogWatches.png",
    link: "/products?subcategory=analog-watches",
  },
  {
    id: 2,
    name: "Cameras",
    image: "/categories/Cameras.png",
    link: "/products?subcategory=digital-cameras",
  },
  {
    id: 3,
    name: "Refrigerators",
    image: "/categories/Refrigerators.png",
    link: "/products?subcategory=refrigerators",
  },
  {
    id: 4,
    name: "Smart Watches",
    image: "/categories/SmartWatches.png",
    link: "/products?subcategory=smart-watches",
  },
  {
    id: 5,
    name: "Blenders",
    image: "/categories/Blenders.png",
    link: "/products?subcategory=blenders",
  },
];

export const featuredBrands = [
  {
    name: "LG",
    image: "/brands/LG.png",
    link: "/products?brand=lg",
  },
  {
    name: "Sony",
    image: "/brands/Sony.png",
    link: "/products?brand=sony",
  },
  {
    name: "Apple",
    image: "/brands/Apple.png",
    link: "/products?brand=apple",
  },
  {
    name: "Samsung",
    image: "/brands/Samsung.png",
    link: "/products?brand=samsung",
  },
  {
    name: "Hisense",
    image: "/brands/Hisense.png",
    link: "/products?brand=hisense",
  },
  {
    name: "Acer",
    image: "/brands/Acer.png",
    link: "/products?brand=acer",
  },
  {
    name: "Alpine",
    image: "/brands/Alpine.png",
    link: "/products?brand=alpine",
  },
  {
    name: "AVF",
    image: "/brands/AVF.png",
    link: "/products?brand=avf",
  },
  {
    name: "Canon",
    image: "/brands/Canon.png",
    link: "/products?brand=canon",
  },
  {
    name: "GBL",
    image: "/brands/GBL.png",
    link: "/products?brand=gbl",
  },
  {
    name: "Amana",
    image: "/brands/Amana.png",
    link: "/products?brand=amana",
  },
  {
    name: "Asus",
    image: "/brands/Asus.png",
    link: "/products?brand=asus",
  },
];

export const footerLinks = [
  {
    title: "About Qtron",
    content: [
      {
        label: "About Us",
        href: "/about",
      },
      {
        label: "Careers",
        href: "/about/careers",
      },
      {
        label: "Locations",
        href: "/about/locations",
      },
      {
        label: "Blog",
        href: "/blog",
      },
      {
        label: "Customer Reviews",
        href: "/customer-reviews",
      },
    ],
  },
  {
    title: "Make Money with Us",
    content: [
      {
        label: "Sell on Qtron",
        href: "/sell-on-qtron",
      },
      {
        label: "Affiliate Program",
        href: "/affiliate-program",
      },
      {
        label: "Advertise Your Products",
        href: "/us/advertise",
      },
      {
        label: "Participate in Research",
        href: "/us/research",
      },
    ],
  },
  {
    title: "Customer Service",
    content: [
      {
        label: "Contact Us",
        href: "/contact",
      },
      {
        label: "Order Tracking",
        href: "/order-tracking",
      },
      {
        label: "Returns",
        href: "/returns",
      },
      {
        label: "Shipping",
        href: "/shipping",
      },
      {
        label: "FAQs",
        href: "/about/faq",
      },
    ],
  },

  {
    title: "Extra Information",
    content: [
      {
        label: "Privacy Policy",
        href: "/us/privacy-policy",
      },
      {
        label: "Terms of Service",
        href: "/us/terms",
      },
      {
        label: "Cookie Policy",
        href: "/us/cookie-policy",
      },
      {
        label: "Payment Methods",
        href: "/payment-methods",
      },
      {
        label: "Sitemap",
        href: "/sitemap",
      },
    ],
  },
];

export const navItems = [
  {
    title: "Dashboard",
    path: "/admin",
  },
  {
    title: "Orders",
    path: "/admin/orders",
  },
  {
    title: "Products",
    path: "/admin/products",
  },
  {
    title: "Create Product",
    path: "/admin/products/create",
  },
  {
    title: "Categories",
    path: "/admin/categories",
  },
  {
    title: "Customers",
    path: "/admin/customers",
  },
  {
    title: "Inventory",
    path: "/admin/inventory",
  },
  {
    title: "Marketing",
    path: "/admin/marketing",
  },
  {
    title: "Reviews",
    path: "/admin/reviews",
  },
  {
    title: "Settings",
    path: "/admin/settings",
  },
  {
    title: "Analytics",
    path: "/admin/analytics",
  },
  {
    title: "Support",
    path: "/admin/support",
  },
];
