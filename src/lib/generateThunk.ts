import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosIns } from "./axios";
import _map from "lodash/map";

type Mapping = {
  labelMap: string;
  idMap?: string;
};

interface IOptions {
  mappings: Mapping;
  defaultAllSelection: boolean;
}

export const generateThunk = (
  thunkName: string,
  endpoint: string,
  options: IOptions,
): AsyncThunk<any, void, {}> => {
  return createAsyncThunk(thunkName, async () => {
    const { data } = await axiosIns.get(endpoint, {
      params: { all: true },
    });
    const results = _map(data?.data?.results ?? data?.results, (item) => ({
      value: item[options.mappings?.idMap || "id"],
      label: item[options.mappings.labelMap],
    }));
    if (options.defaultAllSelection) {
      results.unshift({ value: "all", label: "All" });
    }
    return results;
  });
};
