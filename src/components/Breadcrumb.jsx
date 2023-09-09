import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const Breadcrumb = (props) => {
    
  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link to="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {props.pages.map((page, index) => (
          <li key={index}>
            <div className="flex items-center">
                
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link
                to={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {page.title}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default  Breadcrumb;