export const dropDownStyle = ({ placeholder }: { placeholder: boolean }) => ({
  width: "100%",
  "& .MuiSelect-select": {
    color: placeholder ? "rgba(0,0,0,0.6)" : "currentColor",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiPopover-paper": {
    zIndex: "10001 !important",
  },
  "& .MuiListItemIcon-root": { display: "none" },
  "& .MuiListItemText-root": { margin: 0 },
});
export const listItemTextStyle = {
  "& .MuiListItemText-primary": {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};
export const menuItemStyle = {
  display: "flex",
  alignItems: "center",
  zIndex: 11111,
  "& .MuiListItemText-root": { whiteSpace: "normal" },
};
