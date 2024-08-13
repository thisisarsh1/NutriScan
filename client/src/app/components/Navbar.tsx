"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/app/libs/utils";
import Link from "next/link";
function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
  <Menu setActive={setActive}>
    <Link href="/">
      <MenuItem setActive={setActive} active={active} item="Home" />
    </Link>
    <MenuItem setActive={setActive} active={active} item="Discover">
      <div className="flex flex-col space-y-4 text-sm sm:text-base">
        <HoveredLink href="/nutrition-info">Nutrition Info</HoveredLink>
        <HoveredLink href="/user-info">User Info</HoveredLink>
        {/* <HoveredLink href="/dietary-suitability">Dietary Suitability</HoveredLink>
        <HoveredLink href="/product-scanner">Product Scanner</HoveredLink> */}
      </div>
    </MenuItem>
    
    <MenuItem setActive={setActive} active={active} item="Resources">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 text-sm sm:text-base">
        <ProductItem
          title="Blog"
          href="/blog"
          src="https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          description="Read the latest articles on nutrition and health."
        />
        <ProductItem
          title="Recipes"
          href="/recipes"
          src="https://images.pexels.com/photos/8629037/pexels-photo-8629037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          description="Explore healthy recipes tailored to your dietary needs."
        />
        <ProductItem
          title="Health Guides"
          href="/health-guides"
          src="https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          description="Get comprehensive guides on managing health conditions."
        />
        <ProductItem
          title="Community"
          href="/community"
          src="https://images.pexels.com/photos/3280130/pexels-photo-3280130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          description="Join our community to share tips and experiences."
        />
      </div>
    </MenuItem>

    {/* Commented out section for future use */}
    {/* <MenuItem setActive={setActive} active={active} item="Plans">
      <div className="flex flex-col space-y-4 text-sm sm:text-base">
        <HoveredLink href="/free-plan">Free Plan</HoveredLink>
        <HoveredLink href="/premium-plan">Premium Plan</HoveredLink>
      </div>
    </MenuItem> */}
    
    <MenuItem setActive={setActive} active={active} item="Authenticate">
      <div className="flex flex-col space-y-4 text-sm sm:text-base">
        <HoveredLink href="/Signup">Sign-Up</HoveredLink>
        <HoveredLink href="/Login">Login-In</HoveredLink>
      </div>
    </MenuItem>
  </Menu>
</div>

  );
}

export default Navbar;
