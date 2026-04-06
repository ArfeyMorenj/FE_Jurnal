// helper/formatDate.js
const formatDate = (dateString) => {
    if (!dateString) return "-";
  
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "-";
  
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  
  export default formatDate;
  