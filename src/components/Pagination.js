import { Link } from "react-router-dom";

const Pagination = ({
  totalPosts,
  postsPerPage,
  currentpage,
  setcurrentpage,
}) => {
  const lowerBound = currentpage > 1 ? (currentpage - 1) * postsPerPage : 1;
  const upperBound =
    currentpage * postsPerPage > totalPosts
      ? totalPosts
      : currentpage * postsPerPage;

  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          to="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          to="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {`${lowerBound} to ${upperBound} `}
            </span>
            of
            <span className="font-medium"> {totalPosts}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            <div>
              {pages.map((page, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setcurrentpage(page)}
                    className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
