import React from 'react';

const Footer = () => {
    const linkClass = 'text-neutral-400 hover:text-white transition';
    const year = new Date().getFullYear();
    const navGroups = [
        {
            title: 'Product',
            links: ['Features', 'Pricing', 'API'],
        },
        {
            title: 'Company',
            links: ['About', 'Blog', 'Careers'],
        },
    ];

    const socialLinks = [
        { icon: 'fa-twitter', label: 'Twitter', href: '#' },
        { icon: 'fa-linkedin', label: 'LinkedIn', href: '#' },
        { icon: 'fa-github', label: 'GitHub', href: '#' },
    ];

    return (
        <footer id="footer" className="bg-neutral-900 border-t border-neutral-800 py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <i className="fa-solid fa-link text-2xl text-white"></i>
                            <span className="text-xl text-white font-semibold">URLShort</span>
                        </div>
                        <p className="text-neutral-400">
                            Making link sharing simple and efficient for everyone.
                        </p>
                    </div>

                    {navGroups.map((group) => (
                        <div key={group.title}>
                            <h4 className="text-white mb-4">{group.title}</h4>
                            <ul className="space-y-2">
                                {group.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className={linkClass}>
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h4 className="text-white mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            {socialLinks.map(({ icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="text-neutral-400 hover:text-white transition text-xl"
                                >
                                    <i className={`fa-brands ${icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-neutral-400 text-sm">
                    <p>&copy; {year} URLShort. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
