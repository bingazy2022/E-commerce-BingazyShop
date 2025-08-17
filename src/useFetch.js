import { useState, useEffect } from "react";
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
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error(
            res.statusText ? res.statusText : "Network response was not ok"
          );
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsloding(false);
      })
      .catch((err) => {
        setIsloding(false);
        setErrMessage(err.message);
      });
  }, [url]);

  return { data, Isloding, errMessage };
}
