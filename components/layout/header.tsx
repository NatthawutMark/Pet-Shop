'use client'
import { ShoppingCart, User, Search } from 'lucide-react'
import { Button } from "@/Meterials"
import { useRouter } from 'next/navigation';

function Header() {
    const router = useRouter();

    return (
        <header className="w-full bg-pink-100 border-b">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between gap-4">

                    {/* Left: Logo */}
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-300">
                            🐱
                        </div>
                        <span className="font-semibold text-lg">Home</span>
                    </div>

                    {/* Center: Search */}
                    <div className="flex flex-1 justify-center">
                        <div className="relative w-full max-w-xl">
                            <input
                                type="text"
                                placeholder="ค้นหารายการทั้งหมด"
                                className="w-full rounded-full border border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            />
                            <Search
                                size={18}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            />
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-4">
                        <button className="relative rounded-full p-2 hover:bg-pink-200">
                            <ShoppingCart size={22} />
                        </button>

                        <Button onClick={() => { router.push('/auth') }} className="flex items-center gap-2 rounded-full border px-3 py-1 hover:bg-pink-200">
                            <User size={18} />
                            <span className="text-sm">เข้าสู่ระบบ</span>
                        </Button>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header;