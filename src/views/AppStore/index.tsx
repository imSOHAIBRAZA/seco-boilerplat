import React from "react";
import { Box, Typography } from "@mui/material";
import { AppCard, AppCardSkeleton, IconButton, Modal, SearchField } from "../../components";
import { AddIcon, DeleteIcon, EditIcon } from "../../assets/icons";
import * as sx from "./AppStore.styles";
import * as mock from "./AppStore.mock";
import _ from "lodash";

import { useApps } from "./AppStore.hooks";
import { getScreenDescription, rootStyles, useAppSelector } from "../../lib";
import { Field } from "../../components/Modal/Modal.types";
import { setSelectedApps } from "../../features/appstore/appstore-slice";
import { useDispatch } from "react-redux";
import { App } from "../../types";
import { ActionButton } from "./AppStore.types";

const AppStore = () => {
  const dispatch = useDispatch();

  const apps = useAppSelector((state) => state.apps.queriedApps);
  const isLoading = useAppSelector((state) => state.apps.isLoading);
  const isMutating = useAppSelector((state) => state.apps.isMutating);
  const selectedApps = useAppSelector((state) => state.apps.selectedApps);

  const operatorOptions = useAppSelector((state) => state.dropdown.operators);
  const user = useAppSelector((state) => state?.auth?.user);

  const appFields: Field[] = React.useMemo(
    () =>
      [
        {
          key: "name",
          label: "Name",
          required: true,
          visible: true,
          type: "text",
        },
        {
          key: "category",
          label: "Category",
          required: true,
          visible: true,
          type: "text",
        },
        {
          key: "description",
          label: "Description",
          required: true,
          visible: true,
          type: "text",
        },
        {
          key: "app_slug",
          label: "app slug",
          required: true,
          visible: true,
          type: "text",
        },
        {
          key: "company_ids",
          label: "Operator",
          required: true,
          visible: true,
          options: operatorOptions,
          type: "multiSelect",
        },
        {
          key: "icon",
          label: "Upload App Icon",
          required: false,
          visible: true,
          type: "file",
          accept: "image/*",
          multiple: false,
          size: "half",
        },
        {
          key: "sidebar_icon",
          label: "Upload Sidebar Icon",
          required: false,
          visible: true,
          type: "file",
          accept: "image/*",
          multiple: false,
          size: "half",
        },
      ] as Field[],
    [operatorOptions],
  );

  const {
    searchQuery,
    handleSearch,
    toggleAddModal,
    toggleDeleteModal,
    toggleEditModal,
    addModal,
    editModal,
    deleteModal,
    formik,
    handleFormSubmit,
    searchFilter,
    handleSelectFilter,
    onInstallApp,
  } = useApps();

  const ActionButtons: ActionButton[] = React.useMemo(() => {
    if (user?.type === "SA") {
      return [
        {
          label: "Add",
          Icon: AddIcon,
          onClick: toggleAddModal
        },
        {
          label: "Edit",
          Icon: EditIcon,
          onClick: toggleEditModal,
          disabled: selectedApps.length !== 1,
        },
        {
          label: "Delete",
          Icon: DeleteIcon,
          onClick: toggleDeleteModal,
          disabled: selectedApps.length !== 1,
        },
      ];
    } else {
      return [];
    }
  }, [user, selectedApps]);

  const handleRecordSelection = (selected: App) => {
    if (selected?.id === selectedApps[0]?.id) {
      dispatch(setSelectedApps([]));
    } else {
      dispatch(setSelectedApps([selected]));
    }
  };

  return (
    <React.Fragment>
      <Box sx={rootStyles.rootContentWrapper}>
        <Typography variant='body2'>{getScreenDescription(location.pathname)}</Typography>
        <Box sx={rootStyles.headerWrapper}>
          <Box sx={rootStyles.buttonsWrapper}>
            {_.map(ActionButtons, ({ label, Icon, onClick, disabled }, index: number) => (
              <IconButton
                icon={Icon}
                disabled={disabled}
                key={index}
                onClick={onClick}
                variant='contained'
              >
                {label}
              </IconButton>
            ))}
          </Box>
          <SearchField
            filterValue={searchFilter}
            onSelect={handleSelectFilter}
            value={searchQuery}
            onChange={handleSearch}
            options={mock.filterOptions}
          />
        </Box>
        <Box sx={sx.cardsWrapper}>
          {isLoading
            ? _.map(new Array(12), (_, index) => <AppCardSkeleton key={index} />)
            : _.map(apps, (value) => (
                <AppCard
                  key={value.id}
                  onClick={() => handleRecordSelection(value)}
                  isActive={selectedApps[0]?.id === value.id}
                  label={value.name}
                  category={value.category}
                  appSlug={value.app_slug}
                  description={value.description}
                  img={value.icon}
                  isInstalled={value.is_installed}
                  onInstallApp={onInstallApp}
                  id={value.id}
                />
              ))}
        </Box>
      </Box>
      <Modal
        title='Add App'
        onClose={toggleAddModal}
        open={addModal}
        onSubmit={formik.handleSubmit}
        formik={formik}
        fields={appFields}
        disabled={isMutating}
      />
      <Modal
        title='Edit App'
        onClose={toggleEditModal}
        open={editModal}
        formik={formik}
        fields={appFields}
        onSubmit={formik.handleSubmit}
        submitButtonText='Save'
        disabled={isMutating}
      />
      <Modal
        title='Delete App(s)'
        description='Are you sure you want to delete the App(s)?'
        onClose={toggleDeleteModal}
        open={deleteModal}
        onSubmit={handleFormSubmit}
        submitButtonText='Yes, Proceed'
        disabled={isMutating}
      />
    </React.Fragment>
  );
};

export default AppStore;
