const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://ecom-next-backend.herokuapp.com"
    : "http://localhost:5000";
export default baseUrl;
