import { logos, testimonials } from "@/constants/client";

const ClientSection = () => {
    return (
        <section id="clients" className="py-24 bg-neutral-800">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <h2 className="text-3xl text-white text-center mb-16">
                    Trusted by Industry Leaders
                </h2>

                {/* Logos */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {logos.map((logo, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center p-8 bg-neutral-700 rounded-xl"
                            aria-label={`Logo of ${logo.alt}`}
                        >
                            <i className={`${logo.icon} text-4xl text-white`} />
                        </div>
                    ))}
                </div>
                <div className="mt-16 max-w-3xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-neutral-700 p-6 rounded-xl"
                                aria-labelledby={`testimonial-${index}`}
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.img}
                                        alt={`${testimonial.name}'s avatar`}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="ml-4">
                                        <div
                                            id={`testimonial-${index}`}
                                            className="text-white font-semibold"
                                        >
                                            {testimonial.name}
                                        </div>
                                        <div className="text-neutral-300 text-sm">
                                            {testimonial.title}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-neutral-300">{testimonial.feedback}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientSection;
