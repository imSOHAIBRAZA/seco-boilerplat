export const sxSkeltonBase = {
  height: 20,
  transformOrigin: "0 0",
  transform: "inherit",
};

export const sxSkeletonRowContainer = {
  display: "flex",
  p: 2,
  borderBottom: "1px solid #e0e0e0",
  width: "100%",
};
export const sxCellContainer = { display: "flex", gap: 6, height: 20, width: "100%" };

export const sxSkeletonCheckbox = {
  ...sxSkeltonBase,
  width: 20,
  mr: 3,
};

export const sxSkeltonCell = {
  ...sxSkeltonBase,
  flex: 1,
};
