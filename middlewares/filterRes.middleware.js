function filterRes(...filteredProperties) {
  return (req, res, next) => {
    const oldJson = res.json;

    res.json = (data) => {
      if (typeof data === "object") {
        for (let property in filteredProperties) {
          if (data[property]) {
            delete data[property];
          }
        }
      }
    };

    oldJson.call(this, data);

    next();
  };
}

export default filterRes;
