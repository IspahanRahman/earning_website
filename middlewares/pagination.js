module.exports = (data,page,itemsPerPage) => {
  const startIndex = (page -1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex,endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return {
    paginatedData,
    totalPages
  };
};