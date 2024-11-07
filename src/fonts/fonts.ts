import { Roboto, Merriweather, Barlow } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700", "900"],
});

export const barlow = Barlow({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});
