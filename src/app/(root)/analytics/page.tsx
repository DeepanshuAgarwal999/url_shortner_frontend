"use client"

import { makeRequest } from "@/apis/makeRequest";
import Pagination from "@/components/global/pagination";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type UrlAnalytics = {
    createdAt: string;
    isActive: boolean;
    lastClicked: string;
    originalUrl: string;
    shortUrl: string;
    totalClicks: number;
    urlId: string;
}

const Analytics = () => {
    const [links, setLinks] = useState<UrlAnalytics[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [stats, setStats] = useState<any>(null)
    const [pagination, setPagination] = useState<any>(null);
    const { isLoggedIn } = useAuth()
    const router = useRouter()

    const fetchAnalytics = async () => {
        if (!isLoggedIn) {
            router.replace("/login")
            return
        }
        try {
            setIsLoading(true);
            const response = await makeRequest("/urls/analytics?page=" + currentPage,);
            setLinks(response.data || []);
            setPagination(response.pagination);
            setStats(response.stats);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, [currentPage]);

    const statses = [
        { title: "Total Clicks", value: stats?.totalClicks || 0, icon: "fa-chart-line" },
        { title: "Active Links", value: stats?.totalActiveLinks || 0, icon: "fa-link" },
        { title: "Total links", value: stats?.totalUrls || 0, icon: "fa-user" },
    ];
    if (isLoading || !isLoggedIn) { return null }

    return (
        <div className="min-h-screen pt-20 bg-gradient-to-br from-neutral-900 to-neutral-800">
            <div className="container mx-auto px-4 py-8">
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {statses.map((stat, index) => (
                        <div key={index} className="bg-neutral-800 p-6 rounded-xl border border-neutral-700">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white">{stat.title}</h3>
                                <i className={`fa-solid ${stat.icon} text-neutral-400`}></i>
                            </div>
                            <p className="text-3xl text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Table Section */}
                <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
                    <div className="p-6 border-b border-neutral-700">
                        <h2 className="text-xl text-white">Your Links</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-neutral-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-neutral-300">Original URL</th>
                                    <th className="px-6 py-3 text-left text-neutral-300">Short URL</th>
                                    <th className="px-6 py-3 text-left text-neutral-300">Clicks</th>
                                    <th className="px-6 py-3 text-left text-neutral-300">Status</th>
                                    <th className="px-6 py-3 text-left text-neutral-300">Created</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-700">
                                {links.map((link) => (
                                    <tr key={link.urlId} className="hover:bg-neutral-700/50">
                                        <td className="px-6 py-4 text-neutral-300">{link.originalUrl}</td>
                                        <td className="px-6 py-4 text-white">{link.shortUrl}</td>
                                        <td className="px-6 py-4 text-neutral-300">{link.totalClicks}</td>
                                        <td className="px-6 py-4 text-neutral-300">
                                            {link.isActive ? "Active" : "Inactive"}
                                        </td>
                                        <td className="px-6 py-4 text-neutral-300">{link.createdAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {pagination?.totalPages > 1 && (
                    <Pagination
                        totalPages={pagination.totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        hasNextPage={pagination.hasNextPage}
                        hasPreviousPage={pagination.hasPreviousPage}
                    />
                )}
            </div>
        </div>
    );


};

export default Analytics;
