const PRODUCTS = [
    { 
        id: 1, 
        name: "UltraBook Pro 14", 
        price: 14000, 
        image: "img/ultraBook.png",
        category: "laptop",
        stock: 5,
        rating: 4.7,
        overview: "High performance laptop for work and gaming.",
        features: ["Intel i7","16GB RAM","1TB SSD"],
        description: "A powerful ultrabook designed for professionals who need speed, reliability, and portabilty."
    },

    { 
        id: 2, 
        name: "Smart X Phone 13", 
        price: 9000, 
        image: "img/smartphone.png",
        category: "phones",
        stock: 10,
        rating: 4.5,
        overview: "OLED display with 5G.",
        features: ["128GB","5G","OLED"],
        description: "A sleek smartphone with stunning visuals, fast performance, and long battery life."
    },

    { 
        id: 3,
        name: "NoiseBeat Headphone", 
        price: 5000, 
        image: "img/headphone.png",
        category: "audio",
        stock: 0, // OUT OF STOCK
        rating: 4.9,
        overview: "Premium noise-cancelling headphones.",
        features: ["Active Noise Cancellation","40hr battery"],
        description: "Enjoy immersive sound with advanced ANC and long lasting comfort."
    },

    { id: 4, 
        name: "WatchPro X", 
        price: 3000, 
        image: "img/smartwatch.png",
        category: "wearable",
        stock: 8,
        rating: 4.2,
        overview: "Smart fitness tracking watch.",
        features: ["GPS","Waterproof", "Heart Rate Monitor"],
        description: "Track your health and workouts with precision and style."
    },

    {
        id: 5,
        name: "Game Series 1",
        price: 10000,
        image: "img/gaming pc.png",
        category: "game",
        stock: 10,
        rating: 4.9,
        overview: "High performance gaming desktop built for competitive and immersive gameplay.",
        features: [
            "RTX Graphics Card",
            "16GB RAM",
            "1TB SSD Storage",
            "RGB Lighting",
            "Advanced Cooling System"
        ],
        description: "Dominate every game with ultra-fast performance and stunning visuals. Game series 1 engineered for gamers who demand speed, power, and reliability-perfect for AAA titles, streaming, and multitasking without comprise."
    },
    {
        id: 6,
        name: "Meta Quest 3S",
        price: 6500,
        category: "wearable",
        image: "img/meta quest 3s.png",
        stock: 14,
        rating: 4.7,
        overview: "Next-gen mixed reality headset for immersive gaming and experiences.",
        features: [
            "Mixed Reality (VR + AR)",
            "High-Resolution Display",
            "Snapdragon XR Processor",
            "Wireless Freedom",
            "Advanced Hand Tracking"
        ],
        description: "Step into the future with Meta Quest 3s. Experience immersive virtual worlds, interact with digital objects in your real space, and enjoy powerful performance-all without cables. Perfect for gaming, fitness, and entertainment."
    },
    {
        id: 7,
        name: "AirBeat Earbuds",
        price: 1800,
        category: "audio",
        image: "img/earbuds.png",
        stock: 50,
        rating: 4.5,
        overview: "Compact wireless earbuds with immersive sound and all day comfort.",
        features: [
            "Active Noise Cancellation",
            "Bluetooth 5.3",
            "Touch Controls",
            "20-Hour Battery (with case)",
            "Fast Charging"
        ],
        description: "Experience true wireless freedom with AirBeat Earbuds. Designed for crystal clear audio, deep bass, and a secure fit, they are perfect for music, calls, and workouts anytime, anywhere."
    },
    {
        id: 8,
        name: "Pro Laptop X",
        price: 160000,
        category: "laptop",
        image: "img/laptop.png",
        stock: 6,
        rating: 4.8,
        overview: "Ultra-powerful laptop designed for professionals, creators, and high-performance tasks.",
        features: [
            "Intel Core i9 Processor",
            "32GB RAM",
            "2TB SSD Storage",
            "4k Ultra HD Display",
            "Dedicated RTX Graphics",
            "All-Day Battery Life"
        ],
        description: "Pro Laptop X delivers unmatched speed, stunning visuals, and seamless multitasking. Built for demanding workloads like video editing, 3D rendering, and software development, it combines power with a sleek, premium design."
    },
    {
        id: 9,
        name: "Pro Game M2",
        price: 12000,
        category: "monitor",
        image: "img/computer Monitor.png",
        stock: 12,
        rating: 4.7,
        overview: "High-refresh rate gaming monitor built for smooth and competitive gameplay.",
        features: [
            "27-inch QHD Display",
            "165Hz Refresh Rate",
            "1ms Response Time",
            "Adaptive Sync Technology",
            "Ultra-Thin Bezels"
        ],
        description: "Level up your gaming experience with Pro Game M2. Featuring ultra-smooth visuals, sharp resolution, and lightning fast response time, it is perfect for competitive gamers and immersive gameplay."
    },
    {
        id: 10,
        name: "Game Series 1",
        price: 10000,
        category: "game", 
        image: "img/gaming pc.png",
        stock: 9,
        rating: 4.8,
        overview: "Next-level gaming desktop built for high performance and smooth multitasking.",
        features: [
            "AMD Ryzen 7 Processor",
            "16GB RAM",
            "1TB SSD",
            "RTX Graphics Support",
            "RGB Cooling System"
        ],
        description: "Game Series 1 is designed for gamers who want powerful performance without compromise. Enjoy fast load times, smooth gameplay, and reliable power for both gaming and productivity."
    },
     { 
        id: 11,
        name: "Boom Speaker",
        price: 25000,
        category: "audio",
        image: "img/speaker.png",
        stock: 15,
        rating: 4.6,
        overview: "Powerful wireless speaker with deep bass and crystal clear sound.",
        features: [
            "Bluetooth 5.0",
            "360° Surround Sound",
            "12-Hour Battery Life",
            "Portable Design"
        ],
        description: "Turn up the volume anywhere with Boom Speaker. Designed for music lovers, it delivers rich bass, crisp highs, and all-day battery life perfect for parties, outdoor adventures, or relaxing at home."

    }, 
    {
        id: 12,
        name: "Smart TV",
        price: 180000,
        image: "img/smart tv.png",
        category: "home_appliance",
        stock: 8,
        rating: 4.8,
        overview: "Ultra HD 75-inch Smart TV with streaming apps and vivid colors."
    },

    {
        id: 13,
        name: "ProShot DSLR Camera",
        price: 9500,
        image: "img/camera.png",
        category: "camera",
        stock: 6,
        rating: 4.5,
        overview: "High performance DSLR camera with advanced lens and crisp image quality."
    },
    {
        id: 14,
        name: "Pocket SSD 1TB",
        price: 2500,
        image: "img/portable hardware.png",
        category: "portable hardware",
        stock: 15,
        rating: 4.6,
        overview: "Compact portable SSD with fast transfer speeds and durable design."
    },
    {
        id: 15,
        name: "XGame Console",
        price: 7000,
        category: "game",
        image: "img/Xgame.png",
        stock: 20,
        rating: 4.7,
        overview: "immersive action packed gaming console with stunning visuals and performance.",
        features: [
            "4k Ultra HD Gaming",
            "Fast SSD Storage",
            "Wireless Contrillers",
            "Online Multiplayer Support"
        ],
        description: "Experience next level gaming with XGame console. Designed for speed, power, and immersive gameplay, it delivers smooth performance, stunning graphics, and endless entertainment."
    }   
];