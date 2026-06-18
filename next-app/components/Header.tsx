'use client';

import Link from 'next/link';

function Header() {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 w-full">
      <Link href="/about">About</Link>
    </div>
  );
}

export default Header;
