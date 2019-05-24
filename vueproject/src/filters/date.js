import moment from "moment";

export default value => {
  const formatDate = moment(value).format("MMMM Do YYYY, h:mm:ss a");
  return formatDate;
};
