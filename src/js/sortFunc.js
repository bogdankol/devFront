export const sortFunc = (a, b, criteria) => {
    switch (criteria) {
      case "byNameAsc":
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }

      case "byNameDesc":
        if (a.name > b.name) {
          return -1;
        } else {
          return 1;
        }
      case "byEmailAsc":
        if (a.email > b.email) {
          return 1;
        } else {
          return -1;
        }
      case "byEmailDesc":
        if (a.email > b.email) {
          return -1;
        } else {
          return 1;
        }
      case "byWebsiteAsc":
        if (a.website > b.website) {
          return 1;
        } else {
          return -1;
        }
      case "byWebsiteDesc":
        if (a.website > b.website) {
          return -1;
        } else {
          return 1;
        }
      case "byCityAsc":
        if (a.address.city > b.address.city) {
          return 1;
        } else {
          return -1;
        }
      case "byCityDesc":
        if (a.address.city > b.address.city) {
          return -1;
        } else {
          return 1;
        }
      default:
        return;
    }
  };