export const sortFuncTwo = (a, b, criteriaTwo) => {
    switch (criteriaTwo) {
      case "byNameAsc":
        if (a.data.name > b.data.name) {
          return 1;
        } else {
          return -1;
        }

      case "byNameDesc":
        if (a.data.name > b.data.name) {
          return -1;
        } else {
          return 1;
        }
      case "byEmailAsc":
        if (a.data.email > b.data.email) {
          return 1;
        } else {
          return -1;
        }
      case "byEmailDesc":
        if (a.data.email > b.data.email) {
          return -1;
        } else {
          return 1;
        }
      case "byWebsiteAsc":
        if (a.data.website > b.data.website) {
          return 1;
        } else {
          return -1;
        }
      case "byWebsiteDesc":
        if (a.data.website > b.data.website) {
          return -1;
        } else {
          return 1;
        }
      case "byCityAsc":
        if (a.data.address.city > b.data.address.city) {
          return 1;
        } else {
          return -1;
        }
      case "byCityDesc":
        if (a.data.address.city > b.data.address.city) {
          return -1;
        } else {
          return 1;
        }
      default:
        return;
    }
  };