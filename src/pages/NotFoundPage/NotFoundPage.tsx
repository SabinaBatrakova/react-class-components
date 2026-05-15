import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <>
      <h1>404 - page not found</h1>
      <Link to="/"> Return to the main page</Link>
    </>
  );
}
export default NotFoundPage;
