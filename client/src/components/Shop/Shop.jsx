"use client";
import React, { useState } from "react";
import BookFilter from "./BookFilter";
import BookList from "./BookList";
import PageHeader from "../PageHeader";

const books = [
  {
    name: "র্যান্ডম বই শিরোনাম ১",
    author_name: "লেখক ১",
    publication: "প্রকাশনা ১",
    rating: 4.5,
    price: 15.99,
    tag: "কল্পকাহিনী",
    genre: "Classics",
    discountrate: 0.2,
    discountprice: 12.79,
    image: "/book1.jpg",
  },
  {
    name: "র্যান্ডম বই শিরোনাম ২",
    author_name: "লেখক ২",
    publication: "প্রকাশনা ২",
    rating: 4.2,
    price: 10.99,
    tag: "অকল্পকাহিনী",
    genre: "Horror",
    discountrate: 0.1,
    discountprice: 9.89,
    image: "/book2.jpg",
  },
  {
    name: "র্যান্ডম বই শিরোনাম ৩",
    author_name: "লেখক ১",
    publication: "প্রকাশনা ৩",
    rating: 4.8,
    price: 12.99,
    tag: "কল্পকাহিনী",
    genre: "Detective",
    discountrate: 0.15,
    discountprice: 11.04,
    image: "/book1.jpg",
  },
  {
    name: "র্যান্ডম বই শিরোনাম ৪",
    author_name: "লেখক ৩",
    publication: "প্রকাশনা ১",
    rating: 3.9,
    price: 8.99,
    tag: "কবিতা",
    genre: "Thriller",
    discountrate: 0.05,
    discountprice: 8.54,
    image: "/book2.jpg",
  },
  {
    name: "র্যান্ডম বই শিরোনাম ৫",
    author_name: "লেখক ৪",
    publication: "প্রকাশনা ২",
    rating: 4.7,
    price: 20.99,
    tag: "গবেষণা",
    genre: "Romantic",
    discountrate: 0.25,
    discountprice: 15.74,
    image: "/book3.jpg",
  },
  {
    name: "র্যান্ডম বই শিরোনাম ৫",
    author_name: "লেখক ৪",
    publication: "প্রকাশনা ২",
    rating: 4.7,
    price: 20.99,
    tag: "গবেষণা",
    genre: "Romantic",
    discountrate: 0.25,
    discountprice: 15.74,
    image: "/book4.jpg",
  },
  {
    name: "র্যান্ডম বই শিরোনাম ৫",
    author_name: "লেখক ৪",
    publication: "প্রকাশনা ২",
    rating: 4.7,
    price: 20.99,
    tag: "গবেষণা",
    genre: "Romantic",
    discountrate: 0.25,
    discountprice: 15.74,
    image: "/book5.jpg",
  },
  {
    name: "র্যান্ডম বই শিরোনাম ৫",
    author_name: "লেখক ৪",
    publication: "প্রকাশনা ২",
    rating: 4.7,
    price: 20.99,
    tag: "গবেষণা",
    genre: "Romantic",
    discountrate: 0.25,
    discountprice: 15.74,
    image: "/book6.jpg",
  },
];

const Shop = () => {
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [filters, setFilters] = useState({
    author_name: [...new Set(books.map((book) => book.author_name))],
    publication: [...new Set(books.map((book) => book.publication))],
    genre: [...new Set(books.map((book) => book.genre))],
    // tag: [...new Set(books.map((book) => book.tag))],
  });
  const [keyWords, setKeyWords] = useState([
    ...new Set(books.map((book) => book.tag)),
  ]);

  const [selectedFilters, setSelectedFilters] = useState({
    author_name: "",
    publication: "",
    tag: "",
  });

  const handleFilterChange = (filterKey, filterValue) => {
    const newSelectedFilters = { ...selectedFilters, [filterKey]: filterValue };
    setSelectedFilters(newSelectedFilters);

    const newFilteredBooks = books.filter((book) => {
      return Object.keys(newSelectedFilters).every((key) => {
        return (
          newSelectedFilters[key] === "" ||
          book[key] === newSelectedFilters[key]
        );
      });
    });

    setFilteredBooks(newFilteredBooks);
  };

  return (
    <div className="max-w-[1250px] mx-auto grid grid-cols-4 gap-4 p-4">
      <BookFilter
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
      <div className="col-span-3">
        <PageHeader title="Shop" />
        <BookList
          books={filteredBooks}
          keyWords={keyWords}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default Shop;
