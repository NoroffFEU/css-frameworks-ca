/**
 * 
 * @param {String} dateString 
 * @returns {String}
 */

const convertDate = (dateString)=>{
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
    const dateObject = new Date(dateString).toLocaleDateString("en-US", options);
    
    return dateObject;

}

export default convertDate;