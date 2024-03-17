export default function GetToken() {
    const token = sessionStorage.getItem("Portfolio-Token");
    return token ? token : "";
  }
  