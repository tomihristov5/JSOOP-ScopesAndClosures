//Task 1.
//Create a module for working with books
//    The module must provide the following functionalities:
//        Add a new book to category
//            Each book has unique title, author and ISBN
//            It must return the newly created book with assigned ID
//            If the category is missing, it must be automatically created
//        List all books
//            Return an array of books
//            Books are sorted by ID
//            This can be done by author, by category or all
//                They are provided by an options object {category: ...} or {author: ...}
//        List all categories
//            Return an array of categories
//            Categories are sorted by ID
//    Each book/catagory has a unique identifier (ID) that is a number greater than 1
//        When adding a book/category, the ID is generated automatically
//    Add validation everywhere, where possible
//        Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
//        Author is any non-empty string
//        Unique params are Book title and Book ISBN
//        Book ISBN is an unique code that contains either 10 or 13 digits
//        If something is not valid - throw Error

function solve() {
    var library = (function () {
        var categoryIndex;
        var books = [];
        var categories = [];
        function listBooks() {
            var indexWhereCategoryIs;
            var args = arguments[0];
            if (books.length === 0) {
                return [];
            }

            if (args !== undefined) {

                if (args.category !== undefined) {
                    return booksFromAuthorOrCategory(function (currentCategory, index) { return isExisting(currentCategory, index, "name", "category") });
                }
                if (args.author !== undefined) {
                    return booksFromAuthorOrCategory(function (currentCategory, index) { return isExisting(currentCategory, index, "author", "author") });
                }
            }

            return books;

            function booksFromAuthorOrCategory(callback) {
                if (categories.some(callback)) {
                    return categories[indexWhereCategoryIs].books;
                }
                else {
                    return [];
                }
            }

            function isExisting(currentCategory, index, firstProp, secondProp) {
                var areEqual;
                if (currentCategory.length === 0) {

                    return false;
                }

                areEqual = currentCategory[firstProp] === args[secondProp];
                if (areEqual === false) {

                    return false;
                }

                else {
                    indexWhereCategoryIs = index;
                    return true;
                }
            }
        }

        function isCategoryExisting(currentCategory, index, book) {
            if (currentCategory.length === 0) {
                return false;
            }

            categoryIndex = index;
            return currentCategory.name === book.category;
        }

        function addBook(book) {
            validateBook();
            book.ID = books.length + 1;
            addCategory();
            books.push(book);
            return book;

            function validateBook() {
                function isBookTitleExisting(currentBook) {
                    if (currentBook.length === 0) {
                        return false;
                    }

                    return currentBook.title === book.title;
                }

                function isBookIsbnExisting(currentBook) {
                    if (currentBook.length === 0) {
                        return false;
                    }

                    return currentBook.isbn === book.isbn;
                }

                if (book.title.length < 2 || book.title.length > 100 || book.category.length < 2 || book.category.length > 100) {
                    throw new Error('Not valid length');
                }

                if (book.author === 'undefined' || book.author === '') {
                    throw new Error('Book author should not be empty or undefined');
                }

                if (isNaN(book.isbn)) {
                    throw new Error('isbn should be a number');
                }

                if (book.isbn.length !== 10 && book.isbn.length !== 13) {
                    throw new Error('isbn should be 10 or 13 digits');
                }

                if (books.some(isBookTitleExisting)) {
                    throw new Error('Book title already exists');
                }

                if (books.some(isBookIsbnExisting)) {
                    throw new Error('Book isbn already exists');
                }
            }

            function addCategory() {
                var index = categories.indexOf(book.category);
                if (categories.some(function (currentCategory, index) { return isCategoryExisting(currentCategory, index, book) })) {
                    categories[categoryIndex].books.push(book);
                }
                else {
                    var category = {
                        name: book.category,
                        ID: categories.length + 1,
                        books: []
                    };

                    category.books.push(book);

                    categories.push(category);
                }
            }
        }

        function listCategories() {
            var newArr = [],
                    i,
                    len;
            if (arguments[0]) {
                if (categories.some(function (currentCategory, index) { return isCategoryExisting(currentCategory, index, book) })) {
                    return categories[categoryIndex].name;
                }
            }
            if (categories.length === 1) {
                return new Array(categories[0].name);
            };
            for (i = 0, len = categories.length; i < len; i += 1) {
                newArr.push(categories[i].name);
            }

            return newArr;
        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories
            }
        };
    }());
    return library;
}
