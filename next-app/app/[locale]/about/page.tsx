import Link from 'next/link';

function AboutPage() {
  return (
    <>
      <div className="flex flex-col items-center p-15">
        <p className="text-blue-950 text-2xl p-6">Sabina Batrakova</p>
        <a
          href="https://rs.school/courses/reactjs"
          className="text-blue-950 text-2xl p-4"
        >
          RS School
        </a>
        <Link href="/" className="text-green-500 text-3xl">
          {' '}
          Return to the main page{' '}
        </Link>
      </div>
    </>
  );
}
export default AboutPage;
