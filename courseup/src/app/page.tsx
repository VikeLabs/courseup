import { RotatingHands } from 'components/common/RotatingHands';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[90vh] px-3 md:px-5 lg:px-8 w-full items-center justify-center">
      <Image
        priority={true}
        alt="cartoon image of computer"
        src="/assets/computer.svg"
        width="0"
        height="0"
        className="w-1/2 max-w-96 h-auto"
      />
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold">Explore UVic Courses</h1>
        {/* <Search /> */}
        <p className="text-2xl">CourseUp makes it simple to browse and schedule UVic Courses</p>
        <a href="https://www.vikelabs.ca" target="_blank" className="flex items-center mt-2 flex-col xl:flex-row">
          <p className="text-[1em] md:text-[1.5em] text-gray-700 dark:text-gray-200">
            <RotatingHands /> Built by students @
          </p>
          <p className="font-bold text-[1.75em] text-blue-500 dark:text-blue-300 ml-1">VIKE LABS</p>
        </a>
      </div>
    </div>
  );
}
