import { CartState } from "../context/Context";
import Filters from "../components/Filters";
import SingleProduct from "./SingleProduct";
import { useState } from "react";
import CustomFooter from "../components/footer";
import PaginationComponent from "../components/customPagination";
const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };
  const itemsPerPage = 6; // You can adjust this as per your requirement.
  const items = [...transformProducts()]; // Sample list of items. Replace this with your actual list.
  console.log("items", items);
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transformProducts().slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div>
      <div className="home">
        <Filters />
        <div className="productContainer">
          {currentItems.map((prod) => (
            <SingleProduct prod={prod} key={prod.id} />
          ))}
        </div>
      </div>
      <PaginationComponent
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <CustomFooter />
    </div>
  );
};

export default Home;
