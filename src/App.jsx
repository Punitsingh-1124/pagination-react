// this example for 100 dummyproducts and totaly manualy handling next pages or privios pages 
// import React, { useEffect, useState } from 'react'

// const App = () => {

//   const [products, setProducts] = useState([])
//   const [page, setPage] = useState(1)

//   const fetchProducts = async () => {
//     const res = await fetch`https://dummyjson.com/products?limit=100`;
//     const data = await res.json()

//     if (data && data.products) {
//       setProducts(data.products)
//       // console.log(data);
//     }
//   }
//   console.log(products);


//   useEffect(() => {
//     fetchProducts()
//   }, []);

//   const selectPageHandler = (selectPage) => {
//     if (selectPage >= 1 && selectPage <= products.length / 10 && selectPage !== page)
//       setPage(selectPage);

//   }


//   return (
//     <div>
//       {
//         products.length > 0 && <div className='products'>
//           {
//             products.slice((page - 1) * 10, page * 10).map((prod) => {
//               return (
//                 <span className='products__single' key={prod.id}>
//                   <img src={prod.thumbnail} alt={prod.title} />
//                   <span className='title'>{prod.title}</span>
//                 </span>
//               );
//             })
//           }
//         </div>
//       }
//       {
//         products.length > 0 && <div className='pagination'>
//           <span onClick={() => selectPageHandler(page - 1)}
//             className={page > 1 ? '':'pagination__disable'}>⬅️</span>
//           {
//             [...Array(products.length / 10)].map((_, i) => {
//               return <span
//                 className={page === i + 1 ? "pagination__selected" : ""}
//                 onClick={() => selectPageHandler(i + 1)}
//                 key={i}
//               >
//                 {i + 1}
//               </span>
//             })
//           }
//           {/* <span>1</span>
//           <span>2</span> */}
//           <span onClick={() => selectPageHandler(page + 1)}
//             className={page < products.length / 10 ? '':'pagination__disable'}>➡️</span>
//         </div>
//       }
//     </div>
//   )
// }

// export default App  


//IMP : in this case its show the real time api give one time limited data for eg.(10 products detail) that time using this way to fetch data in advance way

import React, { useEffect, useState } from 'react'

const App = () => {

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}&select=title,price,thumbnail`);
    const data = await res.json()
    console.log(data);

    if (data && data.products) {
      setProducts(data.products)
      setTotalPages(Math.ceil(data.total / 10))
    }
  }
  console.log(products);


  useEffect(() => {
    fetchProducts()
  }, [page]);

  const selectPageHandler = (selectPage) => {
    if (selectPage >= 1 && selectPage <= totalPages && selectPage !== page)
      setPage(selectPage);

  }


  return (
    <div>
      {
        products.length > 0 && <div className='products'>
          {
            products.map((prod) => {
              return (
                <span className='products__single' key={prod.id}>
                  <img src={prod.thumbnail} alt={prod.title} />
                  <span className='title'>{prod.title}</span>
                </span>
              );
            })
          }
        </div>
      }
      {
        products.length > 0 && <div className='pagination'>
          <span onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? '' : 'pagination__disable'}>⬅️</span>
          {
            [...Array(totalPages)].map((_, i) => {
              return <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            })
          }
          {/* <span>1</span>
          <span>2</span> */}
          <span onClick={() => selectPageHandler(page + 1)}
            className={page < totalPages ? '' : 'pagination__disable'}>➡️</span>
        </div>
      }
    </div>
  )
}

export default App

