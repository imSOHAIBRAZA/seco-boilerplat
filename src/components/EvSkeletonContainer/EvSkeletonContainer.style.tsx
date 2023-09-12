export const sxSkeltonBase = {
  height: 20,
  transformOrigin: "0 0",
  transform: "inherit",
};
export const sxSkeletonSearch = {
  ...sxSkeltonBase,
  ml: "auto",
  height: 44,
  width: { md: "auto", xs: "100%" },
  minWidth: 220,
};

export const sxSkeletonContainer = { display: "flex", gap: 1, mb: 3, flexWrap: "wrap" };
export const sxSkeltonFilter = {
  ...sxSkeltonBase,
  height: 44,
  width: 110,
};

export const sxSkeletonTable = {
  ...sxSkeltonBase,
  borderRadius: 4,
  height: 600,
  width: "100%",
};
export const sxSkeletonText = {
  ...sxSkeltonBase,
  fontSize: "14px",
  mb: 3,
};
