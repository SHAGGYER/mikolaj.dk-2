export const createPopup = ({ serverUrl, clientId, type }, cb) => {
  const url = serverUrl + "/auth/" + type + "?clientId=" + clientId;
  const win = window.open(url, "auth", "width=600,height=600");

  const handler = async (event) => {
    if (event.data.token) {
      cb(event.data.token);
      win.close();
      window.removeEventListener("message", handler);
    }
  };

  window.addEventListener("message", handler);
};

export const redirectToAuthServer = ({
  serverUrl,
  clientId,
  type,
  redirectUrl,
}) => {
  window.location.href =
    serverUrl +
    "/auth/" +
    type +
    "?clientId=" +
    clientId +
    "&redirectUrl=" +
    redirectUrl;
};
