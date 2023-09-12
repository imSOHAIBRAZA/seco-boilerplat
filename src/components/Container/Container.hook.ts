import * as React from "react";
import { useAppDispatch, useAppSelector, useSnackbar } from "../../lib";
import { changePassowrd, patchUser } from "../../features/user/user-thunk";
import { useFormik } from "formik";
import { EditProfileSchema, ChangePassowrdSchema } from "./Container.types";
import { UserValues } from "../../views/Users/Users.types";

export const useContainer = () => {
  const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = React.useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.user);

  const { snackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const onEditProfileSubmit = React.useCallback(
    async (
      values: Partial<UserValues> & {
        id: number;
      },
    ) => {
      try {
        await dispatch(
          patchUser({
            ...values,
          }),
        ).unwrap();
        setShowEditModal(false);
        snackbar({ message: "User Saved Successfully", type: "success" });
      } catch (err: unknown) {
        snackbar({
          message: "Something went wrong while editing",
          type: "error",
        });
      }
    },
    [dispatch, snackbar],
  );

  const onChangePasswordSubmit = React.useCallback(
    async (
      values: Partial<UserValues> & {
        confirm_password: string;
        new_password: string;
        old_password: string;
      },
    ) => {
      try {
        await dispatch(
          changePassowrd({
            ...values,
          }),
        ).unwrap();

        if (showPasswordModal) {
          changePasswordForm.resetForm();
        }
        setShowPasswordModal(false);
        snackbar({ message: "Password Changed Successfully", type: "success" });
      } catch (err: unknown) {
        snackbar({
          message: "Something went wrong while changing",
          type: "error",
        });
      }
    },
    [dispatch, snackbar],
  );

  const editProfileForm = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      id: 0,
      type: "",
    },
    onSubmit: onEditProfileSubmit,
    validationSchema: EditProfileSchema,
  });

  const changePasswordForm = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    onSubmit: onChangePasswordSubmit,
    validationSchema: ChangePassowrdSchema,
  });

  const onEditProfileModalOpen = React.useCallback(() => {
    if (user) {
      editProfileForm.setValues({
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        id: user.id,
        type: user.type,
      });
    }
    if (showEditModal) {
      editProfileForm.resetForm();
    }
    setShowEditModal(true);
  }, [editProfileForm, user, showEditModal]);

  const onChangePasswordModalOpen = React.useCallback(() => {
    changePasswordForm.setValues({
      old_password: "",
      new_password: "",
      confirm_password: "",
    });
    if (showPasswordModal) {
      changePasswordForm.resetForm();
    }
    setShowPasswordModal(true);
  }, [changePasswordForm, showPasswordModal]);

  const openModal = (modalKey: string) => {
    if (modalKey === "edit") {
      onEditProfileModalOpen();
    }
    if (modalKey === "change_password") {
      onChangePasswordModalOpen();
    }
  };

  const closeModal = (modalKey: string) => {
    if (modalKey === "edit") {
      setShowEditModal(false);
    }
    if (modalKey === "change_password") {
      setShowPasswordModal(false);
    }
  };

  return {
    openModal,
    editProfileForm,
    showEditModal,
    changePasswordForm,
    showPasswordModal,
    closeModal,
  };
};
