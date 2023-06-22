import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-6xl font-bold mb-8">404</h1>
      <p className="text-2xl mb-4">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;