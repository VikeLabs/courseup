import { RotatingHands } from 'components/common/RotatingHands';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-4 h-[90vh] px-3 md:px-5 lg:px-8 w-full items-center justify-center">
      <Image
        priority={true}
        alt="cartoon image of computer"
        src="/assets/computer.svg"
        width="0"
        height="0"
        className="w-3/4 md:w-1/2 max-w-[30rem] h-auto"
      />
      <div className="flex flex-col gap-4 items-start px-6 md:px-10 lg:px-16">
        <h1 className="text-5xl md:text-7xl font-bold">Explore UVic Courses</h1>
        {/* <Search /> */}
        <p className="text-xl md:text-2xl">CourseUp makes it simple to browse and schedule UVic Courses</p>
        <a href="https://www.vikelabs.ca" target="_blank" className="flex items-center mt-2 flex-col xl:flex-row">
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200">
            <RotatingHands /> Built by students @ <span className="font-bold text-2xl text-blue-500">VikeLabs</span>
          </p>
        </a>
      </div>
    </div>
  );
}
