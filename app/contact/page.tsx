"use client";

import { useState } from "react";
import { Contact as ContactComponent } from "@/components/Contact";

export default function ContactSection() {
  return (
    <div className="max-w-6xl mx-auto">
      <ContactComponent />
    </div>
  );
}
