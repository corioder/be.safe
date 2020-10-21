// TODO: add more error messages

export default errorString => {
  if (errorString.indexOf("TypeError:") != -1) {
    errorString = errorString.replace("TypeError:", "").trim();

    switch (errorString) {
      case "Failed to fetch":
        return "Connection fail, please check your internet connection";
    }
  }
};
