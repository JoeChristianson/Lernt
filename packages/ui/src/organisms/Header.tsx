import { Bell, Home, MessageCircle, Search, User } from "lucide-react";

// TODO: Remove hardcoded values and integrate with actual data/state management
export const Header = () => {
	return (
		<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex items-center">
						<div className="text-2xl font-bold text-blue-600">Social</div>
					</div>

					{/* Search Bar */}
					<div className="hidden md:flex flex-1 max-w-md mx-8">
						<div className="relative w-full">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								type="text"
								placeholder="Search..."
								className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
							/>
						</div>
					</div>

					{/* Navigation Icons */}
					<nav className="flex items-center gap-6">
						<button className="text-gray-700 hover:text-blue-600 transition-colors">
							<Home className="w-6 h-6" />
						</button>
						<button className="text-gray-700 hover:text-blue-600 transition-colors relative">
							<Bell className="w-6 h-6" />
							<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
								3
							</span>
						</button>
						<button className="text-gray-700 hover:text-blue-600 transition-colors relative">
							<MessageCircle className="w-6 h-6" />
							<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
								5
							</span>
						</button>
						<button className="text-gray-700 hover:text-blue-600 transition-colors">
							<User className="w-6 h-6" />
						</button>
					</nav>
				</div>

				{/* Mobile Search */}
				<div className="md:hidden pb-3">
					<div className="relative w-full">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<input
							type="text"
							placeholder="Search..."
							className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
						/>
					</div>
				</div>
			</div>
		</header>
	);
};
