import { useState, useEffect } from "react";
import axios from "axios";
export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [Isloding, setIsloding] = useState(false);
  const [errMessage, setErrMessage] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get("https://fakestoreapi.com/products")
  //     .then((res) => setProducts(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  useEffect(() => {
    setIsloding(true);
    setErrMessage(null);

    axios
      .get(url)
      .then((response) => {
        setData(response.data.products || response.data);
        setIsloding(false);
      })
      .catch((err) => {
        setIsloding(false);
        setErrMessage(err.message);
      });
  }, [url]);

  return { data, Isloding, errMessage };
}
