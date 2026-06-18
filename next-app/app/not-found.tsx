import  Link  from 'next/link'

function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center p-8 text-3xl text-blue-950">
        <h1>404 - page not found</h1>
        <Link href="/" className="text-green-600">
          {' '}
          Return to the main page
        </Link>
      </div>
    </>
  );
}
export default NotFound;
