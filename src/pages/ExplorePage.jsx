import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import ProfileCard from '../Components/ProfileCard';
import StoryCard from '../Components/StoryCard';
import OpenWorkCard from '../Components/OpenWorkCard';
import { stories } from '../Data/stories';
import axios from 'axios';

export default function ExplorePage() {
  const backendURL = import.meta.env.VITE_REACT_BACKEND_URL;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [page, setPage] = useState('Freelancers');

  const categoryOpts = [
    { value: "All", label: "All" },
    { value: "Web Development", label: "Web Development" },
    { value: "Video Editing", label: "Video Editing" },
    { value: "Videography", label: "Videography" },
    { value: "Voice Over", label: "Voice Over" },
    { value: "Graphic Designing", label: "Graphic Designing" },
  ];

  const ratingOpts = [
    { value: "All", label: "All" },
    { value: 1, label: "1 star" },
    { value: 2, label: "2 star" },
    { value: 3, label: "3 star" },
    { value: 4, label: "4 star" },
    { value: 5, label: "5 star" },
  ];

  const [freelancers, setFreelancers] = useState([]);
  const [openTasks, setOpenTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [freelancersRes, openTasksRes] = await Promise.all([
          axios.get(`${backendURL}/freelancers`),
          axios.get(`${backendURL}/open-work`)
        ]);

        setFreelancers(freelancersRes.data || []);
        setOpenTasks(openTasksRes.data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setFilterData] = useState({
    category: null,
    rating: null,
  });

  const validateData = (data) => {
    return data.filter(item => item && typeof item === 'object');
  };

  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [filteredStories, setFilteredStories] = useState(validateData(stories || []));
  const [filteredOpenWorks, setFilteredOpenWorks] = useState([]);

  useEffect(() => {
    try {
      const applyFilters = (dataArray, searchField) => {
        if (!Array.isArray(dataArray)) return [];
        let result = [...dataArray];

        if (searchQuery.trim()) {
          result = result.filter(item => {
            return item &&
              typeof item === 'object' &&
              item[searchField] !== undefined &&
              typeof item[searchField] === 'string' &&
              item[searchField].toLowerCase().includes(searchQuery.toLowerCase());
          });
        }

        if (filterData.category && filterData.category.value !== "All") {
          result = result.filter(item => {
            if (searchField === 'name' && item.tags) {
              return item.tags.some(tag => tag === filterData.category.value);
            }

            if (searchField === 'projTitle' && item.category) {
              return item.category === filterData.category.value;
            }

            return item &&
              typeof item === 'object' &&
              item.category !== undefined &&
              item.category === filterData.category.value;
          });
        }

        if (filterData.rating && filterData.rating.value !== "All") {
          result = result.filter(item => {
            if (searchField === 'projTitle') {
              return true;
            }

            return item &&
              typeof item === 'object' &&
              item.rating !== undefined &&
              typeof item.rating === 'number' &&
              item.rating >= filterData.rating.value;
          });
        }

        return result;
      };

      setFilteredProfiles(applyFilters(validateData(freelancers || []), 'name'));
      setFilteredStories(applyFilters(validateData(stories || []), 'storyTitle'));
      setFilteredOpenWorks(applyFilters(validateData(openTasks || []), 'projTitle'));
    } catch (error) {
      console.error("Error in filtering data:", error);
      setFilteredProfiles(validateData(freelancers || []));
      setFilteredStories(validateData(stories || []));
      setFilteredOpenWorks(validateData(openTasks || []));
    }
  }, [searchQuery, filterData, freelancers, openTasks]);

  const handleCategoryChange = (selectedOption) => {
    setFilterData(prev => ({
      ...prev,
      category: selectedOption
    }));
  };

  const handleRatingChange = (selectedOption) => {
    setFilterData(prev => ({
      ...prev,
      rating: selectedOption
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilterData({
      category: null,
      rating: null
    });
    setCurrentPage(1);
  };

  const getCurrentData = () => {
    switch (page) {
      case 'Freelancers':
        return { data: filteredProfiles, count: filteredProfiles.length };
      case 'Stories':
        return { data: filteredStories, count: filteredStories.length };
      case 'Open Work':
        return { data: filteredOpenWorks, count: filteredOpenWorks.length };
      default:
        return { data: [], count: 0 };
    }
  };

  const { data, count } = getCurrentData();
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(count / itemsPerPage);

  const showRatingFilter = page === 'Freelancers';

  const getSearchPlaceholder = () => {
    switch (page) {
      case 'Freelancers':
        return 'Search by name...';
      case 'Stories':
        return 'Search by title...';
      case 'Open Work':
        return 'Search by project title...';
      default:
        return 'Search...';
    }
  };


  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Mobile Toggle Button */}
      <div className="sm:hidden fixed top-4 right-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all"
        >
          {!isMobileMenuOpen ? (
            <Menu className="w-6 h-6" />
          ) : (
            <X className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar - Inspired by Sanity docs */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
        <div className="flex flex-col h-full p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Explore</h2>
            <p className="text-gray-400 text-sm mt-1">Find freelancers, stories, and open work</p>
          </div>

          <nav className="flex-1 space-y-1">
            <button
              onClick={() => setPage('Freelancers')}
              className={`w-full cursor-pointer text-left px-4 py-3 rounded-lg transition-all flex items-center ${page === 'Freelancers'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
            >
              <span className="mr-3 ">👨‍💻</span>
              Freelancers
            </button>

            <button
              onClick={() => setPage('Stories')}
              className={`w-full cursor-pointer text-left px-4 py-3 rounded-lg transition-all flex items-center ${page === 'Stories'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
            >
              <span className="mr-3">📖</span>
              Stories
            </button>

            <button
              onClick={() => setPage('Open Work')}
              className={`w-full cursor-pointer text-left px-4 py-3 rounded-lg transition-all flex items-center ${page === 'Open Work'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
            >
              <span className="mr-3">💼</span>
              Open Work
            </button>
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-800">
            <p className="text-gray-400 text-sm">Need help?</p>
            <a href="#" className="text-blue-400 hover:underline text-sm">Contact support</a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 sm:ml-64">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <h1 className="text-2xl font-bold">{page}</h1>
          <p className="text-blue-100 mt-1">
            {page === 'Freelancers' && 'Find skilled professionals for your projects'}
            {page === 'Stories' && 'Read success stories from our community'}
            {page === 'Open Work' && 'Browse available projects and opportunities'}
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder={getSearchPlaceholder()}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {/* Category Filter */}
            <div className="flex-1">
              <Combobox
                options={categoryOpts}
                value={filterData.category?.value}
                onChange={handleCategoryChange}
                placeholder="Filter by category"
              />
            </div>

            {/* Rating Filter */}
            {showRatingFilter && (
              <div className="flex-1">
                <Combobox
                  options={ratingOpts}
                  value={filterData.rating?.value}
                  onChange={handleRatingChange}
                  placeholder="Filter by rating"
                />
              </div>
            )}
          </div>

          {/* Filter status */}
          {(searchQuery || filterData.category || filterData.rating) && (
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Showing {count} {count === 1 ? 'result' : 'results'}
                {searchQuery && ` for "${searchQuery}"`}
              </span>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading {page.toLowerCase()}...</p>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          {/* Results */}
          {!loading && !error && (
            <div className="space-y-6 bg-transparent ">
              {count === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="text-gray-400 w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No results found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search or filters</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <>
                  {page === 'Freelancers' && (
                    <div className="grid grid-cols-1 gap-4">
                      {paginatedData.map((profile, index) => (
                        <ProfileCard key={profile._id || index} {...profile} />
                      ))}
                    </div>
                  )}

                  {page === 'Stories' && (
                    <div className="grid grid-cols-1 gap-6">
                      {paginatedData.map((story, index) => (
                        <StoryCard key={story._id || index} {...story} />
                      ))}
                    </div>
                  )}

                  {page === 'Open Work' && (
                    <div className="grid grid-cols-1 gap-6">
                      {paginatedData.map((task, index) => (
                        <OpenWorkCard
                          key={task._id || index}
                          _id={task._id}
                          projTitle={task.projTitle}
                          description={task.description}
                          category={task.category}
                          deadline={task.deadline}
                          revisionsAllowed={task.revisionsAllowed}
                          budgetAmount={task.budgetAmount}
                          clientName={task.clientName}
                          status={task.status}
                          freelancerNotes={task.freelancerNotes}
                          freelancerQues={task.freelancerQues}
                        />
                      ))}
                    </div>
                  )}
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 pt-6">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span>Page {currentPage} of {totalPages}</span>
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Combobox component remains exactly the same as provided
const Combobox = ({ options, value, onChange, placeholder = "Select option..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchValue("");
  };

  return (
    <div className="relative w-full">
      <div
        className="flex items-center justify-between w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">
          {value ? options.find(option => option.value === value)?.label : placeholder}
        </span>
        <ChevronsUpDown className="h-4 w-4 opacity-50" />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-2 py-1.5">
            <input
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`relative cursor-default select-none py-2 pl-10 pr-4 ${value === option.value ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                    } hover:bg-blue-50`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(option);
                  }}
                >
                  <span className="block truncate">{option.label}</span>
                  {value === option.value && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="py-2 px-3 text-gray-500 text-center">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};