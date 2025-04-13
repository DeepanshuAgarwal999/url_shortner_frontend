'use client'

import { UrlService } from "@/apis/UrlService";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/components/shared/Loader";

// Add this interface above the features array
interface Feature {
    icon: string;
    label: string;
    key: keyof CustomizationState;
}

// Update the features array with the type
const features: Feature[] = [
    { icon: 'fa-pen', label: 'Customize Link', key: 'isCustomAlias' },
    { icon: 'fa-calendar', label: 'Expiry Date', key: 'isCustomExpiry' },
    { icon: 'fa-qrcode', label: 'QR Code', key: 'isCustomQrCode' },
];

const buttonClass =
    'flex items-center justify-center gap-2 p-4 rounded-lg bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition cursor-pointer';

interface CustomizationState {
    isCustomAlias: boolean;
    isCustomExpiry: boolean;
    isCustomQrCode: boolean;
}

interface CustomizationData {
    customAlias: string;
    expirationDate: string | null;
    qrCode?: {
        enabled: boolean;
        style: QRCodeStyle;
    };
}

interface QRCodeStyle {
    foreground: string;
    background: string;
}

interface GeneratedLink {
    shortUrl: string;
    qrCode?: {
        imageUrl: string;
    };
}

const HeroSection = () => {
    const router = useRouter();
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedLink, setGeneratedLink] = useState<GeneratedLink | null>(null);
    const [qrCodeColor, setQrCodeColor] = useState<QRCodeStyle>({
        foreground: "",
        background: "",
    });

    const [isCustomization, setIsCustomization] = useState<CustomizationState>({
        isCustomAlias: false,
        isCustomExpiry: false,
        isCustomQrCode: false,
    });

    const [customizationData, setCustomizationData] = useState<CustomizationData>({
        customAlias: '',
        expirationDate: null,
    });


    const resetForm = () => {
        setInput('')
        setCustomizationData({
            customAlias: '',
            expirationDate: '',
        })
        setIsCustomization({
            isCustomAlias: false,
            isCustomExpiry: false,
            isCustomQrCode: false,
        })
    }

    const createUrl = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;
        try {
            setIsLoading(true);
            const data: Record<string, any> = { longUrl: input };

            if (isCustomization.isCustomAlias && customizationData.customAlias.trim()) {
                data.customAlias = customizationData.customAlias;
            }

            if (isCustomization.isCustomExpiry && customizationData.expirationDate) {
                data.expirationDate = new Date(customizationData.expirationDate);
            }

            if (isCustomization.isCustomQrCode) {
                data.qrCode = {
                    enabled: true,
                    style: {
                        foreground: qrCodeColor.foreground,
                        background: qrCodeColor.background,
                    }
                };
            }

            const response = await UrlService.createUrl(data);
            if (response?.data) {
                setGeneratedLink(response.data);
                toast.success('URL created successfully');
                resetForm();
            }
        } catch (error: any) {
            if (error.status === 401) {
                router.push('/login');
            } else {
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <section
            id="hero"
            className="min-h-screen bg-center bg-hero-image flex items-center justify-center relative"
        >

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-neutral-900/80 backdrop-blur-lg p-8 rounded-2xl border border-neutral-700 shadow-xl">
                        <h1 className="text-3xl sm:text-4xl font-semibold text-white text-center mb-8">
                            Shorten Your URLs Instantly
                        </h1>
                        <form className="flex flex-col sm:flex-row gap-4 mb-6" onSubmit={createUrl} >
                            <label htmlFor="url-input" className="sr-only">URL Input</label>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                id="url-input"
                                type="url"
                                placeholder="Enter your long URL here"
                                className="flex-1 px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                                required
                            />
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="bg-white cursor-pointer text-neutral-900 px-6 py-3 rounded-lg hover:bg-gray-200 transition disabled:pointer-events-none disabled:opacity-70"
                            >
                                {isLoading ? <Loader /> : 'Shorten'}

                            </button>
                        </form>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {features.map((feature) => (
                                // The button with fixed typing
                                <button
                                    key={feature.label}
                                    className={buttonClass}
                                    onClick={() => setIsCustomization(prev => ({
                                        ...prev,
                                        [feature.key]: !prev[feature.key]
                                    }))}
                                >
                                    <i className={`fa-solid ${feature.icon}`}></i>
                                    <span className='text-nowrap'>{feature.label}</span>
                                </button>
                            ))}
                        </div>
                        <div className="space-y-4 my-4 ">
                            {isCustomization.isCustomAlias && <input type="text" placeholder="Custom Alias"
                                onChange={(e) => setCustomizationData({ ...customizationData, customAlias: e.target.value })}
                                className="input-field" />}
                            {isCustomization.isCustomExpiry && <input type="date" placeholder="Expiry Date"
                                onChange={(e) => setCustomizationData({ ...customizationData, expirationDate: e.target.value })}
                                className="input-field custom-date-picker" />}
                            {isCustomization.isCustomQrCode &&

                                <>
                                    <p>
                                        Select the colors you want for your QRCode
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <label htmlFor="qr-code-foreground" className="block text-neutral-300 mb-2">
                                            Foreground
                                        </label>
                                        <label htmlFor="qr-code-background" className="block text-neutral-300 mb-2">
                                            Background
                                        </label>
                                        <div className="">
                                            <input type="color" placeholder="Foreground"
                                                onChange={(e) => setQrCodeColor({ ...qrCodeColor, foreground: e.target.value })}
                                                className="input-field !px-2 !py-0" />
                                        </div>
                                        <input type="color" placeholder="Background"
                                            defaultValue={'#FFFFFF'}
                                            onChange={(e) => setQrCodeColor({ ...qrCodeColor, background: e.target.value })}
                                            className="input-field !px-2 !py-0" />
                                    </div>

                                </>
                            }
                        </div>

                        {
                            generatedLink && <div className="space-y-4 bg-neutral-800 p-4 rounded-lg">
                                <h1>Generated Link !!</h1>
                                <div className="flex items-center justify-center gap-4">
                                    <Link href={generatedLink?.shortUrl} className="hover:underline">
                                        {generatedLink?.shortUrl}
                                    </Link>

                                    <button onClick={() => {
                                        navigator.clipboard.writeText(generatedLink?.shortUrl).then(() => {
                                            toast.success('Copied to clipboard')
                                        }).catch(() => {
                                            toast.error('Failed to copy to clipboard')
                                        })
                                    }}>
                                        <i className="fa-solid fa-clipboard cursor-pointer" aria-hidden="true" ></i>
                                    </button>
                                </div>
                                {generatedLink.qrCode && <Image src={generatedLink.qrCode.imageUrl} alt="QR Code" className="mx-auto" width={200} height={200} />}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
