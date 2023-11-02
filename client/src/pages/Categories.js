// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import useCategory from "../hooks/useCategory";
// import Layout from "../components/Layout/Layout";
// const Categories = () => {
//   const categories = useCategory();
//   return (
//     <Layout title={"All Categories"}>
//       <div className="container">
//         <div className="row">
//           {categories.map((c) => (
//             <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
//               <Link to={`/category/${c.slug}`} className="btn btn-primary">
//                 {c.name}
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Categories;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  const handleCategoryClick = async (slug) => {
    try {
      // Make the API request using the correct URL
      const response = await fetch(`/api/v1/product/product-category/${slug}`);
      if (response.ok) {
        // Handle successful response here
      } else {
        // Handle error response here (e.g., show an error message)
        console.error("API request failed");
      }
    } catch (error) {
      // Handle any unexpected errors here
      console.error("An error occurred:", error);
    }
  };

  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link
                to={`/category/${c.slug}`}
                className="btn btn-primary"
                onClick={() => handleCategoryClick(c.slug)}
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
