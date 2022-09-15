import React, { ReactElement, useContext, useEffect, useState } from "react";
import { CustomDialog, useDialog } from "react-st-modal";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import HttpClient from "../../utilities/HttpClient";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import S from "react-switch";
import MediaExplorer from "../../components/MediaExplorer";
import { setSettings } from "../../store/reducers/Auth";
const Switch = S.default ? S.default : S;

const MediaExplorerDialog = () => {
  const dialog = useDialog();

  const onSelect = (path) => {
    console.log("path", path);
    dialog.close(path);
  };

  return <MediaExplorer onSelect={onSelect} />;
};

const Fieldset = styled.fieldset`
  border: 1px solid #bebebe;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export default function Settings() {
  const { settings } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const [availableForWork, setAvailableForWork] = useState(false);
  const [youtubeViews, setYoutubeViews] = useState(
    settings?.youtubeViews || ""
  );

  useEffect(() => {
    if (settings) {
      setAvailableForWork(settings.availableForWork);
    }
  }, [settings]);

  const updateAvailableForWork = async () => {
    await HttpClient().put("/api/admin/update-available-for-work", {
      availableForWork,
    });
  };

  const deleteAllMedia = async () => {
    await HttpClient().delete("/api/media");
    alert("Slettede media");
  };

  const openUpdateHomepageHeaderImageDialog = async () => {
    const result = await CustomDialog(<MediaExplorerDialog />);
    console.log(result);

    if (result) {
      await HttpClient().put("/api/admin/update-homepage-image", {
        homepageHeaderImage: result,
      });
      const _settings = { ...settings };
      _settings.homepageHeaderImage = result;
      dispatch(setSettings(_settings));
    }
  };

  const openUpdateHomepageAboutPlatformImageDialog = async () => {
    const result = await CustomDialog(<MediaExplorerDialog />);

    if (result) {
      await HttpClient().put("/api/admin/update-about-platform-image", {
        image: result,
      });
      const _settings = { ...settings };
      _settings.homepageAboutPlatformImage = result;
      dispatch(setSettings(_settings));
    }
  };

  const updateYoutubeViews = async () => {
    await HttpClient().put("/api/admin/update-youtube-views", { youtubeViews });
  };

  return (
    <div>
      <h1>Settings</h1>

      <Fieldset>
        <legend>Slet alle mediaer</legend>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => deleteAllMedia()}
        >
          Delete
        </Button>
      </Fieldset>

      <Fieldset>
        <legend>Available For Work</legend>

        <Switch
          checked={availableForWork}
          onChange={(checked) => setAvailableForWork(checked)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={updateAvailableForWork}
        >
          Update
        </Button>
      </Fieldset>

      <Fieldset>
        <legend>Homepage -{">"} Header Image</legend>
        {settings?.homepageHeaderImage && (
          <img
            alt="homepage image"
            style={{ width: 400 }}
            src={import.meta.env.VITE_API_URL + settings.homepageHeaderImage}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={openUpdateHomepageHeaderImageDialog}
        >
          Update
        </Button>
      </Fieldset>

      <Fieldset>
        <legend>Homepage -{">"} About Platform Image</legend>
        {settings?.homepageAboutPlatformImage && (
          <img
            alt="homepage image"
            style={{ width: 400 }}
            src={
              import.meta.env.VITE_API_URL +
              settings?.homepageAboutPlatformImage
            }
          />
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={openUpdateHomepageAboutPlatformImageDialog}
        >
          Update
        </Button>
      </Fieldset>

      <Fieldset>
        <legend>YouTube Views</legend>
        <TextField
          style={{ width: 300 }}
          value={youtubeViews}
          onChange={(e) => setYoutubeViews(e.target.value)}
          label="Number of YouTube Views"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={updateYoutubeViews}
        >
          Update
        </Button>
      </Fieldset>
    </div>
  );
}
