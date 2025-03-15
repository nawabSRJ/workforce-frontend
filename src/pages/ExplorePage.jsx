import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import { Menu, X, Search } from 'lucide-react';
import ProfileCard from '../Components/ProfileCard';
import StoryCard from '../Components/StoryCard'; // Assuming you have this component
import OpenWorkCard from '../Components/OpenWorkCard'; // Assuming you have this component
import { stories } from '../Data/stories'; // Keeping stories data as is
import axios from 'axios';
// import Combobox from '@/Components/ui/Combobox';

// todo : make a "view full profile feature"
export default function ExplorePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Page state to track which page we're on
  const [page, setPage] = useState('Freelancers');

  const categoryOpts = [
    { value: "All", label: "All" },
    { value: "Web Development", label: "Web Development" },
    { value: "Video Editing", label: "Video Editing" },
    { value: "Voice Over", label: "Voice Over" },
    { value: "Graphic Designing", label: "Graphic Designing" },
  ]
  
  const ratingOpts = [
    { value: "All", label: "All" },
    { value: 1, label: "1 star" },
    { value: 2, label: "2 star" },
    { value: 3, label: "3 star" },
    { value: 4, label: "4 star" },
    { value: 5, label: "5 star" },
  ]

  // State for data from API
  const [freelancers, setFreelancers] = useState([]);
  const [openTasks, setOpenTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ----------------------------- GET requests 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch both freelancers and open tasks in parallel
        const [freelancersRes, openTasksRes] = await Promise.all([
          axios.get('http://localhost:8000/freelancers'),
          axios.get('http://localhost:8000/open-work')
        ]);
        
        console.log('Freelancers data:', freelancersRes.data);
        console.log('Open Tasks data:', openTasksRes.data);
        
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

  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setFilterData] = useState({
    category: null,
    rating: null,
  });
  
  // Data validation and sanitization
  const validateData = (data) => {
    return data.filter(item => item && typeof item === 'object');
  };
  
  // State for filtered data for each page type
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [filteredStories, setFilteredStories] = useState(validateData(stories || []));
  const [filteredOpenWorks, setFilteredOpenWorks] = useState([]);
  
  // Apply filters to the appropriate data based on current page
  useEffect(() => {
    try {
      // Helper function to apply filters to any data array
      const applyFilters = (dataArray, searchField) => {
        // Ensure dataArray is valid
        if (!Array.isArray(dataArray)) return [];
        let result = [...dataArray];
        
        // Filter by search query using the dynamic searchField parameter
        if (searchQuery.trim()) {
          result = result.filter(item => {
            // Check if item and the dynamic property exist and is a string
            return item && 
                   typeof item === 'object' && 
                   item[searchField] !== undefined && 
                   typeof item[searchField] === 'string' && 
                   item[searchField].toLowerCase().includes(searchQuery.toLowerCase());
          });
        }
        
        // Filter by category (only if not "All")
        if (filterData.category && filterData.category.value !== "All") {
          result = result.filter(item => {
            // For freelancers, check if any tag matches the category
            if (searchField === 'name' && item.tags) {
              return item.tags.some(tag => tag === filterData.category.value);
            }
            
            // For open tasks, check the category property directly
            if (searchField === 'projTitle' && item.category) {
              return item.category === filterData.category.value;
            }
            
            // For other data types, check the category property
            return item && 
                   typeof item === 'object' && 
                   item.category !== undefined && 
                   item.category === filterData.category.value;
          });
        }
        
        // Filter by rating (only if not "All")
        if (filterData.rating && filterData.rating.value !== "All") {
          result = result.filter(item => {
            // Skip rating filter for open tasks since they don't have ratings
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
      
      // Apply filters to each data type with the appropriate search field
      setFilteredProfiles(applyFilters(validateData(freelancers || []), 'name'));
      setFilteredStories(applyFilters(validateData(stories || []), 'storyTitle'));
      setFilteredOpenWorks(applyFilters(validateData(openTasks || []), 'projTitle'));
    } catch (error) {
      console.error("Error in filtering data:", error);
      // In case of error, reset to original validated data
      setFilteredProfiles(validateData(freelancers || []));
      setFilteredStories(validateData(stories || []));
      setFilteredOpenWorks(validateData(openTasks || []));
    }
  }, [searchQuery, filterData, freelancers, openTasks]); // Added dependencies
  
  // Handle category selection
  const handleCategoryChange = (selectedOption) => {
    setFilterData(prev => ({
      ...prev,
      category: selectedOption
    }));
  };
  
  // Handle rating selection
  const handleRatingChange = (selectedOption) => {
    setFilterData(prev => ({
      ...prev,
      rating: selectedOption
    }));
  };
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // The search is already applied via useEffect
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setFilterData({
      category: null,
      rating: null
    });
  };

  // Get the current data and count based on the active page
  const getCurrentData = () => {
    switch(page) {
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

  // ? Only show rating when page === 'Freelancers' evaluated to true i.e page is = freelancers
  const showRatingFilter = page === 'Freelancers' ;

  // Adjust search placeholder based on page
  const getSearchPlaceholder = () => {
    switch(page) {
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
    <div className='flex sm:flex-row w-full h-full sm:pl-20 p-0'>
      {/* Mobile Toggle Button */}
      <div className="sm:hidden fixed top-3 right-7 z-50">
        {!isMobileMenuOpen ? (
          <Menu onClick={toggleMobileMenu} className="text-blue-500 cursor-pointer" size={28} />
        ) : (
          <X onClick={toggleMobileMenu} className="text-blue-500 cursor-pointer" size={28} />
        )}
      </div>

      {/* sidebar */}
      <div className={`fixed left sm:w-1/7 h-screen bg-blue-500 flex flex-col p-2 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-0.5'}`}>
        <nav className=''>
          <li 
            className={`cursor-pointer my-4 ${page === 'Freelancers' ? 'bg-green-500' : 'bg-green-300'} rounded-xl w-fit px-2`} 
            onClick={() => setPage('Freelancers')}
          >
            Freelancers
          </li>
          <li 
            className={`cursor-pointer my-4 ${page === 'Stories' ? 'bg-green-500' : 'bg-green-300'} rounded-xl w-fit px-2`} 
            onClick={() => setPage('Stories')}
          >
            Stories
          </li>
          <li 
            className={`cursor-pointer my-4 ${page === 'Open Work' ? 'bg-green-500' : 'bg-green-300'} rounded-xl w-fit px-2`} 
            onClick={() => setPage('Open Work')}
          >
            Open Work
          </li>
        </nav>
      </div>

      <div className="right sm:w-[90%] pl-5">
        <div className="top header sm:h-24 h-12 bg-amber-400 text-center">
          Ads or images here
        </div>
        <div className="down">
          <div className="filters bg-gray-400 w-full py-4 flex sm:flex-row flex-col items-start justify-center gap-3 px-0">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex items-center w-full sm:w-1/4">
              <div className="relative w-full">
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder={getSearchPlaceholder()}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center px-3 bg-blue-500 text-white rounded-r-md"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
            
            {/* Category Filter */}
            <div className="w-full sm:w-1/4">
              <Combobox 
                options={categoryOpts} 
                value={filterData.category?.value}
                onChange={handleCategoryChange}
                placeholder="Category" 
              />
            </div>
            
            {/* Rating Filter - Only show for relevant pages */}
            {showRatingFilter && (
              <div className="w-full sm:w-1/7">
                <Combobox 
                  options={ratingOpts} 
                  value={filterData.rating?.value}
                  onChange={handleRatingChange}
                  placeholder="Rating" 
                />
              </div>
            )}
          </div>
          
          {/* Filter counter and clear button */}
          {(searchQuery || filterData.category || filterData.rating) && (
            <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Showing {count} result(s)
              </span>
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-500 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
          
          {/* Loading state */}
          {loading && (
            <div className="py-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading data...</p>
            </div>
          )}
          
          {/* Error state */}
          {error && !loading && (
            <div className="py-8 text-center text-red-500">
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Retry
              </button>
            </div>
          )}
          
          {/* Conditional Rendering based on page state */}
          {!loading && !error && (
            <div className="cards">
              {count === 0 && (
                <div className="py-8 text-center text-gray-500">
                  No items match your search criteria
                </div>
              )}
              
              {page === 'Freelancers' && filteredProfiles.map((profile, index) => (
                <ProfileCard key={profile._id || index} {...profile} />
              ))}
              
              {page === 'Stories' && filteredStories.map((story, index) => (
                <StoryCard key={story._id || index} {...story} />
              ))}
              
              {page === 'Open Work' && filteredOpenWorks.map((task, index) => (
                <OpenWorkCard 
                  key={task._id || index}
                  projTitle={task.projTitle}
                  description={task.description}
                  category={task.category}
                  deadline={task.deadline}
                  budgetAmount={task.budgetAmount}
                  clientName={task.clientName}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------------------------
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
    <div className="relative w-1/1 max-w-xs mx-auto">
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
                  className={`relative cursor-default select-none py-2 pl-10 pr-4 ${
                    value === option.value ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
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