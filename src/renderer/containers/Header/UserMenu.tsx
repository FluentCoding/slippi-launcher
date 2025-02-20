import ButtonBase from "@material-ui/core/ButtonBase";
import DialogContentText from "@material-ui/core/DialogContentText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { slippiActivationUrl } from "common/constants";
import { shell } from "electron";
import firebase from "firebase";
import React from "react";
import { useToasts } from "react-toast-notifications";

import { ConfirmationModal } from "@/components/ConfirmationModal";
import { logout } from "@/lib/firebase";
import { useAccount } from "@/lib/hooks/useAccount";

import { NameChangeDialog } from "./NameChangeDialog";
import { UserInfo } from "./UserInfo";

export const UserMenu: React.FC<{
  user: firebase.User;
  handleError: (error: any) => void;
}> = ({ user, handleError }) => {
  const playKey = useAccount((store) => store.playKey);
  const displayName = useAccount((store) => store.displayName);
  const refreshPlayKey = useAccount((store) => store.refreshPlayKey);
  const loading = useAccount((store) => store.loading);
  const [openLogoutPrompt, setOpenLogoutPrompt] = React.useState(false);
  const [openNameChangePrompt, setOpenNameChangePrompt] = React.useState(false);
  const { addToast } = useToasts();
  const onLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
      handleError(err);
    } finally {
      handleClose();
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const handleClose = () => {
    setOpenNameChangePrompt(false);
    setOpenLogoutPrompt(false);
  };

  return (
    <div>
      <ButtonBase onClick={handleClick}>
        <UserInfo uid={user.uid} displayName={displayName} playKey={playKey} loading={loading} />
      </ButtonBase>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        {!playKey && (
          <MenuItem
            onClick={() => {
              closeMenu();
              void shell.openExternal(slippiActivationUrl);
            }}
          >
            Activate online play
          </MenuItem>
        )}
        {!playKey && (
          <MenuItem
            onClick={() => {
              closeMenu();
              refreshPlayKey().catch((err) => addToast(err.message, { appearance: "error" }));
            }}
          >
            Refresh activation status
          </MenuItem>
        )}
        {playKey && (
          <MenuItem
            onClick={() => {
              closeMenu();
              setOpenNameChangePrompt(true);
            }}
          >
            Change display name
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            closeMenu();
            setOpenLogoutPrompt(true);
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      <NameChangeDialog displayName={displayName} open={openNameChangePrompt} handleClose={handleClose} />
      <ConfirmationModal
        title="Are you sure you want to log out?"
        confirmText="Log out"
        open={openLogoutPrompt}
        onClose={handleClose}
        onSubmit={onLogout}
        fullWidth={false}
      >
        <DialogContentText>You will need to log in again next time you want to play.</DialogContentText>
      </ConfirmationModal>
    </div>
  );
};
