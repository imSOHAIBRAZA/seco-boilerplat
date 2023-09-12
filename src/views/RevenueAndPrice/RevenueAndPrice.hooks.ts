import * as React from "react";
import _map from "lodash/map";
import _filter from "lodash/filter";
import _forEach from "lodash/forEach";
import _uniq from "lodash/uniq";

import { serverErrorHandlers, useAppDispatch, useAppSelector, useSnackbar } from "../../lib";
import {
  emptyChargingPrice,
  emptyRevenueOccupancy,
  emptyRevenuePromo,
} from "./RevenueAndPrice.mocks";
import {
  bulkRevenueOccupancySave,
  bulkRevenuePriceSave,
  bulkRevenuePromosSave,
  fetchRevenueGraph,
  fetchRevenueOccupancy,
  fetchRevenuePrice,
  fetchRevenuePromos,
  fetchRevenueStats,
  fetchRevenueAndPriceHistory,
} from "../../features/revenue-and-price/revenue-and-price-thunk";
import { RevenueCommonT } from "../../types/revenue-and-price";
import { formatISO } from "date-fns";
import { updateRevenueFilters } from "../../features/revenue-and-price/revenue-and-price-slice";

export const useRevenueOverview = () => {
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector((state) => state.revenueAndPrice.filters);
  const pageNo = useAppSelector((state) => state.revenueAndPrice.pageNo);
  const rowsPerPage = useAppSelector((state) => state.revenueAndPrice.rowsPerPage);
  const revenuesData = useAppSelector((state) => state.revenueAndPrice.revenues);
  const orderBy = useAppSelector((state) => state.revenueAndPrice.ordering);
  const revenuesDate = _map(revenuesData, (val) => (val?.date ? val?.date : ""));

  const handleFilters = (values: { name: string; value: string }) => {
    const { name, value } = values;
    if (Object.keys(selectedFilters).includes(name)) {
      const updatedFilters = {
        ...selectedFilters,
        [name]: value,
      };
      dispatch(updateRevenueFilters(updatedFilters));
    }
  };

  // const revenuesData = [
  //   {
  //     date: "2022-09-28",
  //     revenue: 320,
  //   },
  //   {
  //     date: "2022-09-29",
  //     revenue: 230,
  //   },
  //   {
  //     date: "2022-09-30",
  //     revenue: 170,
  //   },
  //   {
  //     date: "2022-10-11",
  //     estimated_revenue: 378,
  //   },
  //   {
  //     date: "2022-10-12",
  //     estimated_revenue: 47,
  //   },
  //   {
  //     date: "2022-10-13",
  //     estimated_revenue: 233,
  //   },
  //   {
  //     date: "2022-10-14",
  //     estimated_revenue: 309,
  //   },
  // ];

  // eslint-disable-next-line
  let revenuesChartSeries: ApexAxisChartSeries = [];

  const revenuesLength = _filter(
    _map(revenuesData, (val) => val?.revenue),
    (val) => val,
  )?.length;

  let keys: string[] = [];
  _forEach(revenuesData, (val) => _forEach(val, (_, key) => keys.push(key)));

  keys = _filter(_uniq(keys), (val) => val !== "date");

  revenuesChartSeries = _map(keys, (key) => ({
    name: key,
    type: "line",
    data: _map(revenuesData, (val, index: number) => {
      return (
        val[key] ||
        (key === "estimated_revenue" && index === revenuesLength - 1
          ? revenuesData[revenuesLength - 1]?.revenue
          : null)
      );
    }),
  }));

  React.useEffect(() => {
    dispatch(fetchRevenueStats());
  }, []);

  React.useEffect(() => {
    dispatch(fetchRevenueGraph());
  }, [selectedFilters]);

  React.useEffect(() => {
    dispatch(fetchRevenueAndPriceHistory());
  }, [pageNo, rowsPerPage, orderBy]);

  return { revenuesChartSeries, revenuesDate, handleFilters };
};

export function useRevenuePromos() {
  const [revenuePromosList, setRevenuePromosList] = React.useState<RevenueCommonT[]>([]);

  const selectedStations = useAppSelector((state) => state.revenueAndPrice.selectedStation);

  const { snackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const fetchRevenuePromosList = async (id: number) => {
      try {
        const data = await dispatch(fetchRevenuePromos(id)).unwrap();
        setRevenuePromosList(data);
      } catch (err) {
        serverErrorHandlers(err, snackbar);
      }
    };

    if (selectedStations?.length === 1) {
      fetchRevenuePromosList(selectedStations[0].id);
    } else {
      setRevenuePromosList([]);
    }
  }, [selectedStations]);

  const addRevenuePromos = () => {
    setRevenuePromosList((prevState) => [...prevState, emptyRevenuePromo]);
  };

  const editRevenuePromos = async (index: number, field: string, value: string) => {
    setRevenuePromosList((prevState) =>
      _map(prevState, (promo, i) => {
        if (i === index) {
          return { ...promo, [field]: value };
        } else {
          return promo;
        }
      }),
    );
  };

  const deleteRevenuePromos = (index: number) => {
    setRevenuePromosList((prevState) => _filter(prevState, (_, i) => i !== index));
  };

  const saveRevenuePromos = async () => {
    try {
      const payload = _map(selectedStations, (station) => ({
        data: _map(revenuePromosList, (promo) => ({
          device: station?.id,
          ...promo,
          start_time: formatISO(new Date(promo.start_time)),
          end_time: formatISO(new Date(promo.end_time)),
        })),
        device: station?.id as number,
      }));

      await dispatch(bulkRevenuePromosSave(payload)).unwrap();
      snackbar({ message: "Promotion(s) saved successfully", type: "success" });
    } catch (err: unknown) {
      serverErrorHandlers(err, snackbar);
    }
  };

  return {
    revenuePromosList,
    addRevenuePromos,
    editRevenuePromos,
    deleteRevenuePromos,
    saveRevenuePromos,
  };
}

export function useRevenueOccupancy() {
  const [revenueOccupancyList, setRevenueOccupancyList] = React.useState<RevenueCommonT[]>([]);

  const selectedStations = useAppSelector((state) => state.revenueAndPrice.selectedStation);

  const { snackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const fetchRevenueOccupancyList = async (id: number) => {
      try {
        const data = await dispatch(fetchRevenueOccupancy(id)).unwrap();
        setRevenueOccupancyList(data);
      } catch (err) {
        serverErrorHandlers(err, snackbar);
      }
    };

    if (selectedStations?.length === 1) {
      fetchRevenueOccupancyList(selectedStations[0].id);
    } else {
      setRevenueOccupancyList([]);
    }
  }, [selectedStations]);

  const addRevenueOccupancy = () => {
    setRevenueOccupancyList((prevState) => [...prevState, emptyRevenueOccupancy]);
  };

  const editRevenueOccupancy = async (index: number, field: string, value: any) => {
    setRevenueOccupancyList((prevState) =>
      _map(prevState, (occupancy, i) => {
        if (i === index) {
          return { ...occupancy, [field]: value };
        } else {
          return occupancy;
        }
      }),
    );
  };

  const deleteRevenueOccupancy = (index: number) => {
    setRevenueOccupancyList((prevState) => _filter(prevState, (_, i) => i !== index));
  };

  const saveRevenueOccupancy = async () => {
    try {
      const payload = _map(selectedStations, (station) => ({
        data: _map(revenueOccupancyList, (occupancy) => ({
          device: station?.id,
          ...occupancy,
          start_time: formatISO(new Date(occupancy.start_time)),
          end_time: formatISO(new Date(occupancy.end_time)),
          is_default: occupancy.is_default,
        })),
        device: station?.id as number,
      }));

      await dispatch(bulkRevenueOccupancySave(payload)).unwrap();
      snackbar({ message: "Occupancy(s) saved successfully", type: "success" });
    } catch (err: unknown) {
      serverErrorHandlers(err, snackbar);
    }
  };

  return {
    revenueOccupancyList,
    addRevenueOccupancy,
    editRevenueOccupancy,
    deleteRevenueOccupancy,
    saveRevenueOccupancy,
  };
}

export function useRevenuePrice() {
  const [revenuePriceList, setRevenuePriceList] = React.useState<RevenueCommonT[]>([]);

  const selectedStations = useAppSelector((state) => state.revenueAndPrice.selectedStation);

  const { snackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const fetchRevenuePriceList = async (id: number) => {
      try {
        const data = await dispatch(fetchRevenuePrice(id)).unwrap();
        setRevenuePriceList(data);
      } catch (err) {
        serverErrorHandlers(err, snackbar);
      }
    };

    if (selectedStations?.length === 1) {
      fetchRevenuePriceList(selectedStations[0].id);
    } else {
      setRevenuePriceList([]);
    }
  }, [selectedStations]);

  const addRevenuePrice = () => {
    setRevenuePriceList((prevState) => [...prevState, emptyChargingPrice]);
  };

  const editRevenuePrice = async (index: number, field: string, value: any) => {
    setRevenuePriceList((prevState) =>
      _map(prevState, (price, i) => {
        if (i === index) {
          return { ...price, [field]: value };
        } else {
          return price;
        }
      }),
    );
  };

  const deleteRevenuePrice = (index: number) => {
    setRevenuePriceList((prevState) => _filter(prevState, (_, i) => i !== index));
  };

  const saveRevenuePrice = async () => {
    try {
      const payload = _map(selectedStations, (station) => ({
        data: _map(revenuePriceList, (price) => ({
          device: station?.id,
          ...price,
          start_time: formatISO(new Date(price.start_time)),
          end_time: formatISO(new Date(price.end_time)),
          is_default: price.is_default,
        })),
        device: station?.id as number,
      }));
      await dispatch(bulkRevenuePriceSave(payload)).unwrap();
      snackbar({ message: "Price(s) saved successfully", type: "success" });
    } catch (err: unknown) {
      serverErrorHandlers(err, snackbar);
    }
  };

  return {
    revenuePriceList,
    addRevenuePrice,
    editRevenuePrice,
    deleteRevenuePrice,
    saveRevenuePrice,
  };
}
