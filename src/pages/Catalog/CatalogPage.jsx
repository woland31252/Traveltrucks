import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCampers } from "../../redux/operations.js";
import { toglePage } from "../../redux/camper/sliceCamper.js";
import {
  selectorsCampers,
  selectorsCampersTotal,
  selectorsError,
  selectorsPage,
  selectorsLimit
} from "../../redux/camper/selectorsCamper.js";

import Location from "../../components/Location/Location.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import Collection from "../../components/Collection/Collection.jsx";
import FetchError from "../../components/FetchError/FetchError.jsx";
import Button from "../../components/Button/Button.jsx";
import css from "./CatalogPage.module.css";

function CatalogPage() {
  
  const dispatch = useDispatch();
  const isError = useSelector(selectorsError);
  const campers = useSelector(selectorsCampers);
  const total = useSelector(selectorsCampersTotal);
  const page = useSelector(selectorsPage);
  const limit = useSelector(selectorsLimit);
  const [showBtn, setShowBtn] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [itemsLength, setItemsLength] = useState(null);
  const [search, setSearch] = useState();

  
  
  async function handleSearch(newQuery ) {
    setSearch( newQuery )
    // dispatch(toglePage(page))

  }

  function handleLoadMore() {
    dispatch(toglePage(page + 1));
  }

  useEffect(() => {
    if (!search) {
      dispatch(fetchAllCampers({page, limit}))
    }
    async function fetchData() {

      dispatch(fetchAllCampers({ page, limit, ...search }));
      setShowBtn(campers.length >= limit && campers.length !== 0);
      console.log("length: ", campers.length)
      console.log(search)
    }
    fetchData();
  }, [dispatch, total, campers.length, limit, page, search]);

  

  return (
    <>
      <div className={css.catalogPageContainer}>
        <div className={css.catalogSearchContainer}>
          <Location />
          <Filters onSearch={handleSearch } />
        </div>
        <div className={css.catalogPageCampers}>
          {isError ? <FetchError /> : <Collection />}
          {showBtn && (
            <Button type="button" variant="loadMore" onClick={handleLoadMore}>
              Load more
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default CatalogPage;
