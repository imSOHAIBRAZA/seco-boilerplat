import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../lib";
import { fetchAllVehicles, fetchVehicles, searchVehicles } from "../../features/recognition/recognition-thunk";
import { setSelectedVehicles } from "../../features/recognition/recognition-slice";
import { SearchPromiseT, SearchTimeoutT } from "../../types";

let searchPromise: SearchPromiseT;
let searchTimeout: SearchTimeoutT;

export const useRecognition = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const rowsPerPage = useAppSelector((state) => state.vehicles.rowsPerPage);
  const pageNo = useAppSelector((state) => state.vehicles.pageNo);
  const vehicles = useAppSelector((state) => state.vehicles.vehicles);
  const orderBy = useAppSelector((state) => state.vehicles.ordering);

  const [searchFilter, setSearchFilter] = React.useState<string[]>([
    "vehicle_model",
    "vehicle_number",
    "plate_date",
  ]);

  const handleSelectFilter = (value: string[]) => setSearchFilter(value);

  const dispatch = useAppDispatch();

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value: query },
  }) => {
    clearTimeout(searchTimeout);

    setSearchQuery(query);

    searchTimeout = window.setTimeout(() => {
      searchPromise?.abort?.();
      searchPromise = dispatch(searchVehicles({ query, filter: searchFilter }));
    }, 500);
  };

  React.useEffect(() => {
    dispatch(fetchVehicles({ query: searchQuery, filter: searchFilter }));
    dispatch(fetchAllVehicles({ query: searchQuery, filter: searchFilter }));
    dispatch(setSelectedVehicles([]));

    return () => {
      searchPromise = undefined;
      clearTimeout(searchTimeout);
      searchTimeout = undefined;
    };
  }, [dispatch, rowsPerPage, pageNo, orderBy]);

  return {
    handleSearch,
    searchQuery,
    handleSelectFilter,
    searchFilter,
    vehicles,
  };
};
