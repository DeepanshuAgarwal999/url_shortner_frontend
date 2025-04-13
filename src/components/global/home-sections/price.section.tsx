import { plans } from "@/constants/plans";
import React from "react";

const PriceSection = () => {


    return (
        <section id="pricing" className="py-24 bg-neutral-900">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <h2 className="text-3xl text-white text-center mb-16">
                    Choose Your Plan
                </h2>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`bg-neutral-800 rounded-xl p-8 border ${plan.borderColor}`}
                        >
                            <h3 className="text-xl text-white mb-4">{plan.name}</h3>
                            <div className="text-3xl text-white mb-6">
                                {plan.price}
                                <span className="text-lg text-neutral-400">{plan.period}</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-neutral-300">
                                        <i className="fa-solid fa-check mr-2"></i>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full bg-white text-neutral-900 py-3 rounded-lg">
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PriceSection;
