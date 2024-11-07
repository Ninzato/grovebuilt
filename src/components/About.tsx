import { barlow, merriweather } from "@/fonts/fonts";
import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-5">
        <h2 className={`${merriweather.className} text-center text-4xl`}>
          About Me
        </h2>
        <p className="leading-8">
          <span className="text-6xl font-serif float-left leading-none mr-2">
            T
          </span>
          he seeds were planted a few days ago when I got an assignment to
          create a website using next js. I had a long discussion with chatGPT
          trying to figure out the best website that I could build for this
          project. I check countless websites recommended by GPT but they are
          either too cluttered for my taste or too meh for my liking (not sure
          what the difference is). After countless hours, which is of course an
          exaggeration, I finally found Grovemade which leads me to this point.
        </p>
      </div>
      <div className="flex flex-col gap-8 items-center md:w-4/6 md:mx-auto ">
        <Image
          src="/img/profile.jpg"
          width={200}
          height={200}
          alt="Grovebuilt creator avatar"
          className="rounded-full w-[200px] h-[200px] object-cover"
        />
        <p
          className={`${merriweather.className} text-xl md:leading-10 lg:leading-[1.6] md:text-2xl lg:text-3xl text-center font-light transform -skew-x-12`}
        >
          &quot;The beginning was me watching tens of tutorial to create a
          project. Now I am able to create pretty much anything that I envision,
          almost.&quot;
        </p>
      </div>
      <div className="mx-auto text-center flex flex-col gap-1">
        <p className={`${barlow.className} text-sm tracking-widest`}>
          RIDZA KALIMANTO
        </p>
        <p
          className={`${merriweather.className} text-xs font-light tracking-widest transform -skew-x-12`}
        >
          Hacktiv 8 Student & Aspiring Front End Dev
        </p>
      </div>
    </div>
  );
}
