"use client";
import React from "react";
import { cn } from "@/app/libs/utils";
import { Tooltip } from "./Tooltip";
import { motion } from "framer-motion";
import { LinkPreview } from "@/app/components/ui/link-preview";

function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn(" text-neutral-500 py-6", className)}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">About Us</h4>
            <p>
              NutriScan is dedicated to helping you make informed dietary choices with ease. Our platform provides detailed nutritional information, allergen alerts, and personalized recommendations to help you stay healthy.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><LinkPreview url="/nutrition-info" className="hover:text-white">Nutrition Info</LinkPreview></li>
              <li><LinkPreview url="/allergen-alerts" className="hover:text-white">Allergen Alerts</LinkPreview></li>
              <li><LinkPreview url="/dietary-suitability" className="hover:text-white">Dietary Suitability</LinkPreview></li>
              <li><LinkPreview url="/product-scanner" className="hover:text-white">Product Scanner</LinkPreview></li>
              <li><LinkPreview url="/blog" className="hover:text-white">Blog</LinkPreview></li>
              <li><LinkPreview url="/recipes" className="hover:text-white">Recipes</LinkPreview></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <Tooltip></Tooltip>
            <p>
              <strong>Email:</strong> nutriscanofficial@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> 6969696969
            </p>
            <p>
              <strong>Address:</strong> Rizvi college
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-600 pt-4 text-center">
          <p>&copy; 2024 NutriScan. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <LinkPreview url="https://facebook.com" className="hover:text-white">Facebook</LinkPreview>
            <LinkPreview url="https://twitter.com" className="hover:text-white">Twitter</LinkPreview>
            <LinkPreview url="https://instagram.com" className="hover:text-white">Instagram</LinkPreview>
            <LinkPreview url="https://linkedin.com" className="hover:text-white">LinkedIn</LinkPreview>
          </div>
        </div>
      </div>


 

    </footer>
  );
}

export default Footer;
