import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <>
      <p>Sabina Batrakova</p>
      <a href="https://rs.school/courses/reactjs">RS School</a>
      <Link to="/"> Return to the main page</Link>
    </>
  );
}
export default AboutPage;
