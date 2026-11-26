"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import VexaraLogo from "@/components/brand/VexaraLogo";

const navLinks = [
	{ href: "/perpustakaan", label: "Perpustakaan" },
	{ href: "/pustaka-karya", label: "Pustaka Karya" },
	{ href: "/akademi", label: "Akademi" },
	{ href: "/komunitas", label: "Komunitas" },
	{ href: "/tentang", label: "Tentang" },
];

export default function Navbar() {
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-[#FFFFFF]/90 backdrop-blur-md">
			<div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-12">
				{/* Brand Logo VEXARA */}
				<Link href="/" className="group flex items-center gap-3">
					<VexaraLogo size={24} showWordmark theme="light" />
				</Link>

				{/* Desktop Menu */}
				<nav className="hidden items-center gap-8 md:flex">
					{navLinks.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`relative py-1 text-sm font-medium transition ${
									isActive
										? "text-[#0B0B0D] after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-[#0B0B0D]"
										: "text-[#4B5563] hover:text-[#0B0B0D]"
								}`}
							>
								{item.label}
							</Link>
						);
					})}
				</nav>

				{/* Right Actions */}
				<div className="hidden items-center gap-3 md:flex">
					<Link
						href="/perpustakaan"
						className="inline-flex items-center gap-2 rounded-sm border border-[#E5E7EB] bg-[#F8F9FA] px-3 py-1.5 font-mono text-xs text-[#4B5563] transition hover:border-[#9CA3AF] hover:text-[#0B0B0D]"
					>
						<Search className="h-3.5 w-3.5 text-[#9CA3AF]" />
						<span>Cari Arsip</span>
					</Link>
					<Link
						href="/komunitas"
						className="rounded-sm bg-[#0B0B0D] px-4 py-2 text-xs font-medium tracking-wider text-[#FFFFFF] uppercase transition hover:bg-[#374151]"
					>
						Gabung Kolektif
					</Link>
				</div>

				{/* Mobile Hamburger */}
				<button
					type="button"
					onClick={() => setMobileOpen(!mobileOpen)}
					className="inline-flex items-center justify-center rounded-sm border border-[#E5E7EB] p-2 text-[#0B0B0D] md:hidden"
					aria-label="Buka menu navigasi"
				>
					{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</button>
			</div>

			{/* Mobile Drawer */}
			{mobileOpen && (
				<div className="border-t border-[#E5E7EB] bg-[#FFFFFF] px-6 py-5 md:hidden">
					<nav className="flex flex-col space-y-3">
						{navLinks.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => setMobileOpen(false)}
								className={`py-1.5 text-sm font-medium ${
									pathname === item.href ? "font-semibold text-[#0B0B0D]" : "text-[#4B5563]"
								}`}
							>
								{item.label}
							</Link>
						))}
						<Link
							href="/komunitas"
							onClick={() => setMobileOpen(false)}
							className="mt-2 inline-block rounded-sm bg-[#0B0B0D] px-4 py-2.5 text-center text-xs font-medium tracking-wider text-[#FFFFFF] uppercase"
						>
							Gabung Kolektif
						</Link>
					</nav>
				</div>
			)}
		</header>
	);
}