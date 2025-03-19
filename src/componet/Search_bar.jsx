import React from 'react';
import { TERipple } from 'tw-elements-react';

export default function SearchBar() {
    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative flex items-center border rounded-lg overflow-hidden shadow-md dark:border-neutral-600">
                <input
                    type="search"
                    className="w-full px-4 py-2 text-base  text-black outline-none  dark:bg-transparent"
                    placeholder="Search..."
                    aria-label="Search"
                />
                <TERipple color='light'>
                    <button
                        className="flex items-center justify-center px-4 py-2 bg-primary text-black hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
                        type="button"
                        aria-label="Search button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </TERipple>
            </div>
        </div>
    );
}
