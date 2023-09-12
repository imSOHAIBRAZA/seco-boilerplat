import { PayloadAction, SerializedError } from "@reduxjs/toolkit";

export type SearchTimeoutT = number | NodeJS.Timeout | undefined;

export type SearchPromiseT =
  | (Promise<
      | PayloadAction<
          any,
          string,
          {
            arg: string | { query: string; filter: string[] };
            requestId: string;
            requestStatus: "fulfilled";
          },
          never
        >
      | PayloadAction<
          unknown,
          string,
          {
            arg: string | { query: string; filter: string[] };
            requestId: string;
            requestStatus: "rejected";
            aborted: boolean;
            condition: boolean;
          } & ({ rejectedWithValue: true } | ({ rejectedWithValue: false } & {})),
          SerializedError
        >
    > & {
      abort: (reason?: string | undefined) => void;
      requestId: string;
      arg: string | { query: string; filter: string[] };
      unwrap: () => Promise<any>;
    })
  | { abort?: () => void | undefined; payload?: string; type?: string }
  | undefined;
