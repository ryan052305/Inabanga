import {   Linkedin, Twitter} from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full bg-[#0B0F19] text-gray-400 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

                    {/* Logo + Description */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold text-white">Inabanga</h2>
                        <p className="mt-4 text-sm leading-relaxed text-gray-400">
                            Empowering Amazon sellers with product insights, automation, and data — stay ahead with precision.
                        </p>
                    </div>

                    {/* Footer Navigation */}
                    {[
                        {
                            title: "Product",
                            links: [
                                { href: "/features", label: "Features" },
                                { href: "/pricing", label: "Pricing" },
                                { href: "/faq", label: "FAQ" },
                                { href: "/sitemap.xml", label: "Sitemap" },
                            ],
                        },
                        {
                            title: "Company",
                            links: [
                                { href: "/about", label: "About Us" },
                                { href: "/team", label: "Our Team" },
                                { href: "/careers", label: "Careers" },
                                { href: "/contact", label: "Contact" },
                            ],
                        },
                        {
                            title: "Legal",
                            links: [
                                { href: "/privacy", label: "Privacy Policy" },
                                { href: "/terms", label: "Terms of Service" },
                                { href: "/robots.txt", label: "Robots.txt" },
                            ],
                        },
                    ].map((section, index) => (
                        <div key={index}>
                            <h3 className="font-medium text-white mb-3">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-10"></div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Inabanga. All rights reserved.</p>

                    {/* Social Icons */}
                    <div className="flex space-x-5 mt-4 md:mt-0">
                        <Link href="https://www.linkedin.com/in/allanic-dev/" aria-label="Facebook" className="hover:text-white">
                            <Linkedin className="w-5 h-5" />
                        </Link>
                        <Link href="https://x.com/allanic_dev" aria-label="Twitter" className="hover:text-white">
                            <Twitter className="w-5 h-5" />
                        </Link>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
