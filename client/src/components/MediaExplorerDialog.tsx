import React from "react";
import { useDialog } from "react-st-modal";
import MediaExplorer from "./MediaExplorer";

export default function MediaExplorerDialog() {
  const dialog = useDialog();

  return <MediaExplorer noTitle onSelect={(image) => dialog.close(image)} />;
}
