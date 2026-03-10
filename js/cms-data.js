// ============================================
// Sai Softwares CMS Data Store
// All website content is managed from here
// ============================================

const CMS_DATA = {
    // ---- Company Info ----
    company: {
        name: "Sai Softwares",
        tagline: "Engineering Robust Digital Solutions Since 2020",
        description: "Sai Softwares is a premier technology firm specializing in high-performance app development, enterprise web solutions, and mission-critical server management. With 5+ years of proven industry expertise, we transform complex ideas into market-leading digital products.",
        email: "contact@saisoftwares.com",
        phone: "+1 (555) 724-7638",
        address: "1247 Innovation Drive, Suite 400, San Francisco, CA 94105",
        founded: 2020,
        experienceYears: 5,
        projectsCompleted: 150,
        clientsSatisfied: 90,
        teamMembers: 35,
        socialLinks: {
            linkedin: "https://linkedin.com/company/saisoftwares",
            github: "https://github.com/saisoftwares",
            twitter: "https://x.com/saisoftwares",
            instagram: "https://instagram.com/saisoftwares",
            facebook: "https://facebook.com/saisoftwares",
            whatsapp: "https://wa.me/15557247638"
        }
    },

    // ---- Navigation ----
    navigation: [
        { label: "Home", href: "#hero" },
        { label: "Services", href: "#services" },
        { label: "Portfolio", href: "#portfolio" },
        { label: "Profile", href: "#about" },
        { label: "Contact", href: "#contact" }
    ],

    // ---- Hero Section ----
    hero: {
        headline: "Building Tomorrow's Digital Solutions",
        subheadline: "App Development · Web Development · Server Management",
        description: "We architect, build, and scale robust digital products using modern technologies. Our 5+ years of experience ensures your project is in expert hands.",
        ctaPrimary: { label: "Start Your Project", href: "index.html#contact" },
        ctaSecondary: { label: "View Our Work", href: "portfolio.html" }
    },

    // ---- Services ----
    services: [
        {
            id: "app-dev",
            icon: "images/app_dev.png",
            title: "App Development",
            shortDesc: "Native & cross-platform mobile applications that deliver exceptional user experiences.",
            description: "With over 5 years of specialized experience in mobile ecosystems, we build high-performance applications that users love. Our approach combines robust architecture with intuitive design, ensuring your app stays ahead of the competition.",
            detailedContent: {
                intro: "We don't just build apps; we create digital experiences. Our mobile development team has spent more than half a decade perfecting the art of mobile engineering, from memory-efficient native apps to seamless cross-platform solutions.",
                process: [
                    { title: "Discovery & Strategy", desc: "We analyze your market, competitors, and users to build a roadmap for success." },
                    { title: "UI/UX Design", desc: "Our designers create pixel-perfect interfaces that prioritize user flow and brand identity." },
                    { title: "Agile Development", desc: "Transparent, sprint-based development with regular feedback loops." },
                    { title: "Quality Assurance", desc: "Rigorous testing across 100+ real devices to ensure zero-crash performance." }
                ],
                specialties: ["Custom iOS & Android Apps", "Flutter & React Native Experts", "Enterprise Mobility Solutions", "IoT & Wearable Integration"]
            },
            features: [
                "Native iOS & Android Development",
                "Cross-Platform with Flutter & React Native",
                "UI/UX Design & Prototyping",
                "App Store Optimization",
                "Push Notifications & Analytics",
                "Maintenance & Support"
            ],
            technologies: ["Flutter", "React Native", "Swift", "Kotlin", "Dart", "Firebase"]
        },
        {
            id: "web-dev",
            icon: "images/web_dev.png",
            title: "Web Development",
            shortDesc: "Modern, responsive websites and web applications powered by cutting-edge frameworks.",
            description: "Our web development team focuses on scalability, security, and speed. Having delivered over 100+ web projects in the last 5 years, we know exactly what it takes to build a web presence that converts visitors into customers.",
            detailedContent: {
                intro: "The web is evolving fast, and we stay ahead of it. From headless CMS architectures to complex enterprise dashboards, we build web solutions that are future-proof and hyper-optimized for performance.",
                process: [
                    { title: "Architecture Design", desc: "We plan for scale from day one, choosing the right stack for your growth." },
                    { title: "Responsive Frontend", desc: "Blazing fast interfaces that look stunning on every screen size." },
                    { title: "Secure Backend", desc: "Robust API development with heavy focus on data integrity and security." },
                    { title: "Performance Tuning", desc: "90+ Lighthouse scores guaranteed for better SEO and user retention." }
                ],
                specialties: ["Headless E-commerce", "SaaS Platform Development", "Progressive Web Apps (PWA)", "Complex API Integrations"]
            },
            features: [
                "Custom Website Development",
                "Progressive Web Apps (PWAs)",
                "E-commerce Solutions",
                "CMS Development & Integration",
                "API Development & Integration",
                "SEO & Performance Optimization"
            ],
            technologies: ["React", "Next.js", "Vue.js", "Node.js", "Django", "PHP/Laravel"]
        },
        {
            id: "server-mgmt",
            icon: "images/server_mgmt.png",
            title: "Server Management",
            shortDesc: "Reliable infrastructure management, DevOps, and cloud solutions for scalable systems.",
            description: "Infrastructure is the backbone of your digital business. With 5+ years of experience managing thousands of servers, we ensure 99.99% uptime and enterprise-grade security for your applications.",
            detailedContent: {
                intro: "Stop worrying about servers and focus on your business. Our DevOps engineers automate your infrastructure, optimize your cloud spend, and implement military-grade security protocols.",
                process: [
                    { title: "Infrastructure Audit", desc: "We identify bottlenecks and security risks in your current setup." },
                    { title: "Cloud Migration", desc: "Zero-downtime migration to AWS, Google Cloud, or Azure." },
                    { title: "Continuous Monitoring", desc: "24/7 automated health checks and proactive incident response." },
                    { title: "Cost Optimization", desc: "We typically reduce cloud infrastructure costs by 30-50%." }
                ],
                specialties: ["Kubernetes Orchestration", "CI/CD Automation", "Infrastructure as Code (Terraform)", "Disaster Recovery Planning"]
            },
            features: [
                "Cloud Infrastructure (AWS, GCP, Azure)",
                "Server Setup & Configuration",
                "CI/CD Pipeline Setup",
                "Docker & Kubernetes Orchestration",
                "24/7 Monitoring & Alerting",
                "Security Hardening & Compliance"
            ],
            technologies: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Linux", "Terraform"]
        }
    ],

    // ---- Technologies ----
    technologies: {
        categories: [
            {
                name: "Frontend",
                items: [
                    { name: "React", icon: "⚛️" },
                    { name: "Vue.js", icon: "🟢" },
                    { name: "Next.js", icon: "▲" },
                    { name: "Angular", icon: "🅰️" },
                    { name: "HTML5/CSS3", icon: "🎨" },
                    { name: "TypeScript", icon: "🔷" }
                ]
            },
            {
                name: "Backend",
                items: [
                    { name: "Node.js", icon: "🟩" },
                    { name: "Python", icon: "🐍" },
                    { name: "Java", icon: "☕" },
                    { name: "PHP/Laravel", icon: "🐘" },
                    { name: "Go", icon: "🔵" },
                    { name: "Ruby on Rails", icon: "💎" }
                ]
            },
            {
                name: "Mobile",
                items: [
                    { name: "Flutter", icon: "🦋" },
                    { name: "React Native", icon: "⚛️" },
                    { name: "Swift", icon: "🍎" },
                    { name: "Kotlin", icon: "🤖" },
                    { name: "Dart", icon: "🎯" },
                    { name: "Xamarin", icon: "🔮" }
                ]
            },
            {
                name: "DevOps & Cloud",
                items: [
                    { name: "AWS", icon: "☁️" },
                    { name: "Docker", icon: "🐳" },
                    { name: "Kubernetes", icon: "⎈" },
                    { name: "Terraform", icon: "🏗️" },
                    { name: "Jenkins", icon: "🔧" },
                    { name: "GitHub Actions", icon: "🔄" }
                ]
            },
            {
                name: "Databases",
                items: [
                    { name: "PostgreSQL", icon: "🐘" },
                    { name: "MongoDB", icon: "🍃" },
                    { name: "MySQL", icon: "🗄️" },
                    { name: "Redis", icon: "🔴" },
                    { name: "Firebase", icon: "🔥" },
                    { name: "Elasticsearch", icon: "🔍" }
                ]
            }
        ]
    },

    // ---- Portfolio / Projects ----
    portfolio: [
        {
            id: 1,
            title: "FinTrack Pro",
            category: "app",
            description: "A comprehensive fintech mobile application for real-time portfolio tracking, budgeting, and investment analytics.",
            detailedDescription: "FinTrack Pro is an enterprise-grade financial management tool designed to empower users with deep financial insights. Over an 8-month development cycle, we focused on high-performance data visualization and iron-clad security.",
            challenge: "The client needed to synchronize data from over 2,000 global financial institutions while maintaining sub-second UI responsiveness for complex charting.",
            outcomes: [
                "99.99% Uptime during market peak hours",
                "250,000+ active users within first 6 months",
                "Reduced data synchronization latency by 45%"
            ],
            technologies: ["Flutter", "Dart", "Firebase", "Node.js", "PostgreSQL"],
            duration: "8 months",
            year: 2024,
            client: "Financial Services Corp",
            image: null
        },
        {
            id: 2,
            title: "MediConnect Hub",
            category: "web",
            description: "A telemedicine web platform connecting patients with doctors, featuring real-time video consultations and e-prescriptions.",
            detailedDescription: "In response to the growing need for remote healthcare, we built MediConnect Hub with a focus on ease-of-use for both medical professionals and patients.",
            challenge: "Ensuring high-quality video streaming in areas with low internet bandwidth while maintaining strict HIPAA compliance for data privacy.",
            outcomes: [
                "Served 50,000+ patients in its first quarter",
                "Reduced average waiting time for patients by 30%",
                "Seamless integration with 15+ hospital EMR systems"
            ],
            technologies: ["React", "Node.js", "WebRTC", "MongoDB", "AWS"],
            duration: "10 months",
            year: 2024,
            client: "HealthTech Innovations",
            image: null
        },
        {
            id: 3,
            title: "CloudScale Infra",
            category: "server",
            description: "Enterprise-grade cloud infrastructure migration and management for a retail chain with 500+ stores across North America.",
            detailedDescription: "RetailMax Group was struggling with legacy on-premise servers that frequent outages during seasonal sales. We architected a robust multi-region cloud solution.",
            challenge: "Migrating 4TB of mission-critical inventory data without any downtime during the transition process.",
            outcomes: [
                "Zero downtime during Black Friday peak traffic",
                "40% reduction in annual cloud hosting costs",
                "Improved global data synchronization speed by 5x"
            ],
            technologies: ["AWS", "Kubernetes", "Terraform", "Docker", "Prometheus"],
            duration: "6 months",
            year: 2023,
            client: "RetailMax Group",
            image: null
        }
    ],

    // ---- Team ----
    team: [
        {
            name: "Alex Rivera",
            role: "Founder & CEO",
            bio: "15+ years in tech leadership, previously VP of Engineering at a Fortune 500 company.",
            avatar: null,
            social: { linkedin: "#", github: "#" }
        },
        {
            name: "Sarah Chen",
            role: "CTO",
            bio: "Full-stack architect with expertise in scalable systems and cloud infrastructure.",
            avatar: null,
            social: { linkedin: "#", github: "#" }
        }
    ],

    // ---- Testimonials ----
    testimonials: [
        {
            name: "James Mitchell",
            company: "Financial Services Corp",
            role: "CTO",
            quote: "Sai Softwares delivered our fintech app ahead of schedule. Their technical expertise and attention to detail exceeded our expectations. The app handles millions of transactions seamlessly.",
            rating: 5,
            avatar: null
        }
    ],

    // ---- FAQ ----
    faq: [
        {
            question: "What is your typical project timeline?",
            answer: "Project timelines vary based on complexity. A standard mobile app takes 3-6 months, while complex web platforms may take 6-12 months. We provide detailed timelines after our initial consultation."
        },
        {
            question: "Do you provide post-launch support?",
            answer: "Yes! We offer comprehensive maintenance and support packages including bug fixes, feature updates, performance monitoring, and security patches. Our SLAs guarantee 99.9% uptime."
        }
    ],

    // ---- Contact Form Fields ----
    contactForm: {
        heading: "Let's Build Something Amazing",
        subheading: "Have a project in mind? Fill out the form and we'll get back to you within 24 hours.",
        fields: [
            { name: "name", label: "Full Name", type: "text", required: true },
            { name: "email", label: "Email Address", type: "email", required: true },
            { name: "phone", label: "Phone Number", type: "tel", required: false },
            { name: "company", label: "Company Name", type: "text", required: false },
            { name: "service", label: "Service Interested In", type: "select", required: true, options: ["App Development", "Web Development", "Server Management", "Multiple Services", "Other"] },
            { name: "budget", label: "Estimated Budget", type: "select", required: false, options: ["Under $10,000", "$10,000 - $25,000", "$25,000 - $50,000", "$50,000 - $100,000", "$100,000+"] },
            { name: "message", label: "Project Details", type: "textarea", required: true }
        ]
    },

    // ---- Footer ----
    footer: {
        copyright: "© 2026 Sai Softwares. All rights reserved.",
        quickLinks: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Blog", href: "#" }
        ]
    }
};

// Make data accessible globally
if (typeof window !== 'undefined') {
    window.CMS_DATA = CMS_DATA;
}
