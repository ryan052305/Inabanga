"use client";

import { motion } from "framer-motion";

const teamMembers = [
    {
        name: "Ryan Allanic",
        role: "Founder & Lead Developer",
        image: "",
        description:
            "Leads the vision and development of Inabanga, ensuring high-quality software and seamless user experiences.",
    },
    {
        name: "Ryan Allanic",
        role: "UI/UX Designer",
        image: "",
        description:
            "Designs intuitive and modern interfaces, improving user engagement and visual identity.",
    },
    {
        name: "Ryan Allanic",
        role: "Backend Engineer",
        image: "",
        description:
            "Builds and maintains scalable backend services, API systems, and data processing pipelines.",
    },
    {
        name: "Nhorny Canda",
        role: "Data & Scraping Specialist",
        image: "",
        description:
            "Expert in web scraping, data modeling, and efficient extraction for Amazon market insights.",
    },
];

export default function TeamPage() {
    return (
        <section className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 py-20">
            <div className="max-w-6xl mx-auto px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white"
                >
                    Meet the <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">Inabanga Team</span>
                </motion.h1>

                <p className="text-center text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                    The passionate individuals behind Inabanga — building tools that empower Amazon researchers and e-commerce entrepreneurs.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl transition"
                        >
                            <div
                                className="w-28 h-28 mx-auto rounded-full shadow-lg bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600"
                                style={{
                                    WebkitMaskImage: `url(${member.image})`,
                                    WebkitMaskSize: "cover",
                                    WebkitMaskRepeat: "no-repeat",
                                    WebkitMaskPosition: "center",
                                    maskImage: `url(${member.image})`,
                                    maskSize: "cover",
                                    maskRepeat: "no-repeat",
                                    maskPosition: "center",
                                }}
                            ></div>


                            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                                {member.name}
                            </h3>
                            <p className="text-sm text-blue-600 dark:text-indigo-400 font-medium">
                                {member.role}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                {member.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
